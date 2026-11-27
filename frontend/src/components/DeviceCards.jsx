import { useState } from 'react';
import Icon from './Icon';
import { GateScene, Thermometer, FanGraphic } from './art';
import { useHome } from '../context/HomeContext';

function Card({ icon, title, sub, tab, children }) {
  const { t, openSettings } = useHome();
  return (
    <article className="card">
      <div className="card-header">
        <div className="card-title-group">
          <Icon name={icon} size={34} sw={1.8} />
          <div><div className="card-title-text">{title}</div><span className="card-subtitle">{sub}</span></div>
        </div>
        <div className="card-meta">
          <span className="online-pill">{t('online')}</span>
          <button className="gear-btn" aria-label={t('settings')} onClick={() => openSettings(tab)}><Icon name="gear" size={18} /></button>
        </div>
      </div>
      <div className="card-body">{children}</div>
    </article>
  );
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

export function DoorCard() {
  const { t, dev, toggleDoor } = useHome();
  const [flash, setFlash] = useState(false);
  const locked = dev.door === 'Locked';
  const press = () => { setFlash(true); setTimeout(() => setFlash(false), 160); };
  return (
    <Card icon="door" title={t('doorTitle')} sub={t('doorSub')} tab="door">
      <div className="door-grid">
        <div className="keypad-graphic">
          <div className="keypad-indicator" style={flash ? { background: '#67e8f9', boxShadow: '0 0 20px #38bdf8' } : undefined} />
          {KEYS.map((k) => <button key={k} className="key-btn" onClick={press}>{k}</button>)}
        </div>
        <div className="door-status-box">
          <svg className="padlock-icon" viewBox="0 0 64 76" fill="none" aria-hidden="true">
            <path d={locked ? 'M18 34V22a14 14 0 0128 0v12' : 'M18 34V22a14 14 0 0126-5'} stroke="#1f6fd0" strokeLinecap="round" strokeWidth="8" />
            <rect x="8" y="32" width="48" height="38" rx="10" fill="#1f6fd0" />
            <circle cx="32" cy="48" r="5" fill="#dff0ff" />
            <rect x="30" y="50" width="4" height="10" rx="2" fill="#dff0ff" />
          </svg>
          <div className="status-text-lg">{t(locked ? 'doorLocked' : 'doorUnlocked')}</div>
        </div>
      </div>
      <button className="action-btn" onClick={toggleDoor}><Icon name="lock" /><span>{t(locked ? 'btnUnlock' : 'btnLock')}</span></button>
    </Card>
  );
}

export function GateCard() {
  const { t, dev, toggleGate, fmtDist } = useHome();
  const open = dev.gate === 'Open';
  return (
    <Card icon="car" title={t('gateTitle')} sub={t('gateSub')} tab="parking">
      <div className={'gate-visual-box' + (open ? ' gate-open' : '')}><GateScene /></div>
      <div className="gate-info-row">
        <Icon name="car" size={26} stroke="#123a7a" />
        <div style={{ textAlign: 'center' }}>
          <div className="status-text-lg" style={{ fontSize: 16 }}>{t(open ? 'gateOpen' : 'gateClosed')}</div>
          <div className="sensor-dist-tag">{fmtDist()}</div>
        </div>
      </div>
      <button className="action-btn teal" onClick={toggleGate}><Icon name="gate" /><span>{t(open ? 'btnCloseGate' : 'btnOpenGate')}</span></button>
    </Card>
  );
}

export function FanCard() {
  const { t, dev, toggleFan, fmtTemp, sensors } = useHome();
  const on = dev.fan === 'ON';
  return (
    <Card icon="thermo" title={t('tempTitle')} sub={t('tempSub')} tab="fan">
      <div className="temp-gauge-box"><Thermometer /><div className="temp-val-lg">{fmtTemp(sensors.temp)}</div></div>
      <div className="fan-control-group">
        <div className="fan-status-badge">
          <Icon name="fan" size={26} stroke="#123a7a" />
          <div style={{ fontWeight: 600, fontSize: 15, color: '#0b2a5b' }}>{t(on ? 'fanOn' : 'fanOff')} {on && <span className="pulse-indicator" />}</div>
        </div>
        <FanGraphic spin={on} />
      </div>
      <button className="action-btn" onClick={toggleFan}><Icon name="power" /><span>{t(on ? 'btnFanOff' : 'btnFanOn')}</span></button>
    </Card>
  );
}
