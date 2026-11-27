import { useState } from 'react';
import Icon from '../components/Icon';
import { Banner, Switch, Range, Chips, Row, Section, SideWidget, Info } from '../components/ui';
import { useHome } from '../context/HomeContext';

const TABS = [['door', 'door', 'tabDoor'], ['parking', 'car', 'tabParking'], ['fan', 'fan', 'tabFan'], ['general', 'wifi', 'tabGeneral']];
const PIN_FIELDS = [['cur', 'Current PIN Code', '••••'], ['next', 'New PIN Code', '4 to 6 digits'], ['conf', 'Confirm New PIN', 'Repeat digits']];

function PinForm() {
  const { notify, updateApartmentPassword, demo } = useHome();
  const [f, setF] = useState({ cur: '', next: '', conf: '' });
  const change = (k) => (e) => setF({ ...f, [k]: e.target.value.replace(/\D/g, '') });
  const submit = async (e) => {
    e.preventDefault();
    if (!/^\d{4,6}$/.test(f.next)) return notify('tPinFmt');
    if (f.next !== f.conf) return notify('tPinMismatch');
    if (!demo) {
      try {
        await updateApartmentPassword(f.next, f.conf);
      } catch {
        return notify('serverErr');
      }
    }
    notify('tPinOk');
    setF({ cur: '', next: '', conf: '' });
  };
  return (
    <form onSubmit={submit}>
      <div className="pin-form">
        {PIN_FIELDS.map(([k, label, ph]) => (
          <div className="pin-field" key={k}>
            <label htmlFor={'pin-' + k}>{label}</label>
            <input id={'pin-' + k} type="password" inputMode="numeric" autoComplete="off" maxLength={6} required placeholder={ph} value={f[k]} onChange={change(k)} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}><button className="btn-save-sm" type="submit">Update Access PIN</button></div>
    </form>
  );
}

function DoorTab() {
  const { prefs: p, setPref: s, forceLock } = useHome();
  return (
    <div className="tab-content active">
      <div className="settings-card">
        <Section icon="lock" first>Keypad Security &amp; Access PIN</Section>
        <PinForm />
        <Section icon="clock">Auto-Lock Timer &amp; Alarms</Section>
        <Row label="Automatic Re-Lock Delay" desc="Door will safely bolt shut after remaining unlocked for this duration.">
          <Range value={p.autoLock} min={5} max={60} step={5} label={p.autoLock + 's'} onChange={(v) => s('autoLock', v)} />
        </Row>
        <Row label="Tamper & Failed Attempts Alarm" desc="Sound high-pitch buzzer after 3 consecutive wrong keypad codes."><Switch checked={p.tamper} onChange={(v) => s('tamper', v)} /></Row>
        <Row label="Keypad Audio Click Tone" desc="Acoustic feedback beep upon pressing physical & virtual keys."><Switch checked={p.sound} onChange={(v) => s('sound', v)} /></Row>
      </div>
      <SideWidget icon="shield" title="Door Hardware Status">
        <Info rows={[['Solenoid Lock', '12V Fail-Secure'], ['Last Entry', '15:38 (PIN Auth)'], ['Signal RSSI', '-54 dBm (Strong)', '#108e5f']]} />
        <div className="widget-sub">Quick Actions</div>
        <button className="action-btn" onClick={forceLock}>Force Lock Immediately</button>
      </SideWidget>
    </div>
  );
}

function ParkingTab() {
  const { prefs: p, setPref: s, fmtDist, liftGate } = useHome();
  return (
    <div className="tab-content active">
      <div className="settings-card">
        <Section icon="pulse" first>Ultrasonic Trigger &amp; Proximity Sensor</Section>
        <Row label="Vehicle Detection Trigger Distance" desc="Gate automatically initiates lift when vehicle comes closer than this distance.">
          <Range value={p.gateDist} min={20} max={150} step={5} label={p.gateDist + ' cm'} onChange={(v) => s('gateDist', v)} />
        </Row>
        <Row label="Auto-Close Delay (Clearance)" desc="Seconds to wait after ultrasonic beam is restored before lowering the boom barrier.">
          <Range value={p.gateDelay} min={3} max={25} label={p.gateDelay + 's'} onChange={(v) => s('gateDelay', v)} />
        </Row>
        <Row label="Sensor Sensitivity Filtering" desc="Lowers false triggers from pedestrians or pets passing through.">
          <Chips options={['Low', 'Medium', 'High']} value={p.sens} onChange={(v) => s('sens', v)} />
        </Row>
        <Section icon="shield">Obstacle Safety &amp; Warning LED</Section>
        <Row label="Anti-Crush Reverse Motion" desc="Immediately bounce arm up if obstruction is detected while lowering."><Switch checked={p.antiCrush} onChange={(v) => s('antiCrush', v)} /></Row>
        <Row label="Strobe Warning Flasher on Move" desc="Amber pilot light blinks during boom arm transition."><Switch checked={p.strobe} onChange={(v) => s('strobe', v)} /></Row>
      </div>
      <SideWidget icon="car" title="Live Sensor Telemetry">
        <Info rows={[['Current Sonar Reading', fmtDist()], ['Servo Angle', '0° (Horizontal)'], ['Duty Cycles Today', '48 lifts', '#1255be']]} />
        <button className="action-btn teal" onClick={liftGate}>Emergency Barrier Lift</button>
      </SideWidget>
    </div>
  );
}

function FanTab() {
  const { prefs: p, setPref: s, fmtTemp, sensors, notify, updateFanThreshold, demo } = useHome();
  const saveFanRules = async () => {
    if (!demo) {
      try {
        await updateFanThreshold(p.fanOn, p.fanOff);
      } catch {
        notify('serverErr');
        return;
      }
    }
    notify('tSaved');
  };
  return (
    <div className="tab-content active">
      <div className="settings-card">
        <Section icon="thermo" first>Automated Climate Threshold Rules</Section>
        <Row label="Fan Auto Turn-ON Threshold" desc="Cooling activates when ambient temp reaches or exceeds this level.">
          <Range value={p.fanOn} min={26} max={38} step={0.5} label={fmtTemp(p.fanOn)} onChange={(v) => s('fanOn', v)} />
        </Row>
        <Row label="Fan Auto Turn-OFF Threshold" desc="Cooling stops when room temperature drops safely below this target.">
          <Range value={p.fanOff} min={20} max={28} step={0.5} label={fmtTemp(p.fanOff)} onChange={(v) => s('fanOff', v)} />
        </Row>
        <Row label="Default Fan Speed & Profile" desc="Set variable PWM blade velocity profile when fan triggers.">
          <Chips options={['Eco', 'Normal', 'High', 'Turbo']} value={p.profile} onChange={(v) => s('profile', v)} />
        </Row>
        <Section icon="chart">Display Units &amp; Automation Preferences</Section>
        <Row label="Temperature Units (°Celsius / °Fahrenheit)" desc="Display metric Celsius (°C) or Imperial Fahrenheit (°F) across all cards.">
          <Chips options={[['C', '°C (Celsius)'], ['F', '°F (Fahrenheit)']]} value={p.unit} onChange={(v) => { s('unit', v); notify('tUnit'); }} />
        </Row>
        <Row label="Night Silent Mode (Low Decibel)" desc="Limit maximum fan RPM between 23:00 and 07:00 for peaceful sleep."><Switch checked={p.night} onChange={(v) => s('night', v)} /></Row>
      </div>
      <SideWidget icon="thermo" title="Climate Telemetry">
        <Info rows={[['Room Ambient', fmtTemp(sensors.temp)], ['Humidity Sensor', '48% RH'], ['Power Draw', '18.5 Watts', '#12875b']]} />
        <button className="action-btn" onClick={saveFanRules}>Save Climate Rules</button>
      </SideWidget>
    </div>
  );
}

function GeneralTab() {
  const { demo, setDemo, notify } = useHome();
  return (
    <div className="tab-content active">
      <div className="settings-card">
        <Section icon="wifi" first>Wi-Fi &amp; MQTT Microcontroller Broker</Section>
        <Row label="MQTT Local Broker Host" desc={<>Default home automation broker: <code>mqtt://192.168.1.100:1883</code></>}>
          <button className="btn-save-sm" style={{ alignSelf: 'center' }} onClick={() => notify('tPing')}>Test Ping</button>
        </Row>
        <Row label="Simulated Hardware Demo Mode" desc="Continuously simulates live sensor fluctuations for demonstration."><Switch checked={demo} onChange={setDemo} /></Row>
      </div>
      <SideWidget icon="info" title="Firmware Info">
        <div className="info-box"><div>ESP8266 / NodeMCU v2.4.1</div><div>Uptime: 14 days, 6 hours</div><div>IP: 192.168.1.145</div></div>
      </SideWidget>
    </div>
  );
}

const PANELS = { door: DoorTab, parking: ParkingTab, fan: FanTab, general: GeneralTab };

export default function Settings() {
  const { t, tab, setTab } = useHome();
  const Panel = PANELS[tab];
  return (
    <>
      <Banner icon="gear" title={t('settingsTitle')} sub={t('settingsSub')} />
      <div className="settings-tabs-bar" role="tablist">
        {TABS.map(([id, icon, k]) => (
          <button key={id} role="tab" aria-selected={tab === id} className={'tab-btn' + (tab === id ? ' active' : '')} onClick={() => setTab(id)}>
            <Icon name={icon} size={20} /><span>{t(k)}</span>
          </button>
        ))}
      </div>
      <Panel />
    </>
  );
}
