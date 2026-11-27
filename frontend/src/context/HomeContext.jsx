import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import dict from '../i18n';
import * as deviceApi from '../services/device';

const Ctx = createContext(null);
export const useHome = () => useContext(Ctx);

const KEY = 'smart-home-prefs';
const DEFAULTS = {
  lang: 'en', unit: 'C',
  autoLock: 15, tamper: true, sound: true,
  gateDist: 45, gateDelay: 7, sens: 'Medium', antiCrush: true, strobe: true,
  fanOn: 30, fanOff: 25, profile: 'High', night: true,
};
const readPrefs = () => {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY)) }; } catch { return DEFAULTS; }
};
const nowTime = () => new Date().toTimeString().slice(0, 8);
const SEED_LOGS = [
  { id: 3, time: '15:42:10', icon: 'fan', key: 'logFan', long: 'longFan' },
  { id: 2, time: '15:40:02', icon: 'gate', key: 'logGate', long: 'longGate' },
  { id: 1, time: '15:38:14', icon: 'door', key: 'logDoor', long: 'longDoor' },
  { id: 0, time: '14:15:30', icon: 'wifi', key: 'longBeat' },
];

export function HomeProvider({ children }) {
  const [prefs, setPrefs] = useState(readPrefs);
  const [dev, setDev] = useState({ door: 'Unlocked', gate: 'Closed', fan: 'ON' });
  const [sensors, setSensors] = useState({ temp: 31.8, dist: 78 });
  const [demo, setDemo] = useState(false);
  const [view, setView] = useState('dashboard');
  const [tab, setTab] = useState('door');
  const [logs, setLogs] = useState(SEED_LOGS);
  const [toast, setToast] = useState({ key: '', show: false });
  const timer = useRef();
  const { lang, unit } = prefs;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch { /* storage unavailable */ } }, [prefs]);
  // Simulated sensors are only used in demo mode.
  useEffect(() => {
    if (!demo) return;
    const id = setInterval(() => setSensors({ temp: +(31.5 + Math.random() * 0.8).toFixed(1), dist: Math.floor(68 + Math.random() * 18) }), 3000);
    return () => clearInterval(id);
  }, [demo]);

  useEffect(() => {
    if (demo) return;
    let active = true;
    const refresh = async () => {
      try {
        const result = await deviceApi.getDeviceStatus();
        if (!active || !result?.device) return;
        const data = result.device;
        setSensors((s) => ({
          temp: typeof data.temperature === 'number' ? data.temperature : s.temp,
          dist: typeof data.distance === 'number' ? data.distance : s.dist,
        }));
        setDev((d) => ({
          door: data.apartmentDoorStatus === 'open' ? 'Unlocked' : data.apartmentDoorStatus === 'closed' ? 'Locked' : d.door,
          gate: data.garageDoorStatus === 'open' ? 'Open' : data.garageDoorStatus === 'closed' ? 'Closed' : d.gate,
          fan: data.fanStatus === 'on' ? 'ON' : data.fanStatus === 'off' ? 'OFF' : d.fan,
        }));
      } catch {
        // Keep the last successful status if the backend or device is temporarily unavailable.
      }
    };
    refresh();
    const id = setInterval(refresh, 5000);
    return () => { active = false; clearInterval(id); };
  }, [demo]);

  const t = useCallback((k) => dict[lang][k] ?? dict.en[k] ?? k, [lang]);
  const notify = useCallback((key) => {
    setToast({ key, show: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((s) => ({ ...s, show: false })), 2800);
  }, []);
  const setPref = useCallback((k, v) => setPrefs((p) => ({ ...p, [k]: v })), []);
  const go = useCallback((v) => { setView(v); window.scrollTo({ top: 0 }); }, []);
  const openSettings = useCallback((tb) => { setTab(tb); go('settings'); }, [go]);

  // Every device command goes through here: update state, add a log entry, show a toast.
  // This is the single place to publish the MQTT command later.
  const act = useCallback(async (deviceName, value, icon, logKey, toastKey, command) => {
    if (!demo) {
      try {
        await command();
      } catch (ex) {
        notify(ex.status === 401 ? 'serverErr' : 'serverErr');
        return;
      }
    }
    setDev((d) => ({ ...d, [deviceName]: value }));
    setLogs((l) => [{ id: Date.now(), time: nowTime(), icon, key: logKey }, ...l]);
    notify(toastKey);
  }, [demo, notify]);

  const value = {
    t, lang, unit, prefs, setPref, dev, sensors, demo, view, tab, logs, toast, notify, go, openSettings, setTab,
    toggleLang: () => setPref('lang', lang === 'en' ? 'ar' : 'en'),
    setDemo: (v) => { setDemo(v); notify(v ? 'tDemoOn' : 'tDemoOff'); },
    toggleDoor: () => dev.door === 'Locked'
      ? act('door', 'Unlocked', 'door', 'logDoor', 'tDoorU', () => deviceApi.controlApartment('open'))
      : act('door', 'Locked', 'door', 'logDoorLocked', 'tDoorL', () => deviceApi.controlApartment('close')),
    toggleGate: () => dev.gate === 'Open'
      ? act('gate', 'Closed', 'gate', 'logGateClosed', 'tGateC', () => deviceApi.controlGarage('close'))
      : act('gate', 'Open', 'gate', 'logGate', 'tGateO', () => deviceApi.controlGarage('open')),
    toggleFan: () => dev.fan === 'ON'
      ? act('fan', 'OFF', 'fan', 'logFanOff', 'tFanOff', () => deviceApi.controlFan('off'))
      : act('fan', 'ON', 'fan', 'logFan', 'tFanOn', () => deviceApi.controlFan('on')),
    forceLock: () => act('door', 'Locked', 'door', 'logDoorLocked', 'tForce', () => deviceApi.controlApartment('close')),
    liftGate: () => act('gate', 'Open', 'gate', 'logGate', 'tLift', () => deviceApi.controlGarage('open')),
    updateFanThreshold: (on, off) => deviceApi.updateFanThreshold(on, off),
    updateApartmentPassword: (pin, confirm) => deviceApi.updateApartmentPassword(pin, confirm),
    fmtTemp: (c) => (unit === 'F' ? `${((c * 9) / 5 + 32).toFixed(1)}°F` : `${c.toFixed(1)}°C`),
    fmtDist: () => `${sensors.dist} ${lang === 'ar' ? 'سم' : 'cm'}`,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
