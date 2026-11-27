import Icon from './Icon';
import { useHome } from '../context/HomeContext';

export const Switch = ({ checked, onChange }) => (
  <label className="switch">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <span className="slider" />
  </label>
);

export const Range = ({ value, min, max, step = 1, label, onChange }) => (
  <div className="range-container">
    <input className="range-input" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
    <span className="range-badge">{label}</span>
  </div>
);

export const Chips = ({ options, value, onChange }) => (
  <div className="chip-group">
    {options.map((o) => {
      const [v, l] = Array.isArray(o) ? o : [o, o];
      return <button key={v} type="button" className={'chip-btn' + (v === value ? ' selected' : '')} onClick={() => onChange(v)}>{l}</button>;
    })}
  </div>
);

export const Row = ({ label, desc, children }) => (
  <div className="setting-row">
    <div className="setting-info"><span className="setting-label">{label}</span><span className="setting-desc">{desc}</span></div>
    {children}
  </div>
);

export const Section = ({ icon, first, children }) => (
  <div className="settings-section-title" style={first ? undefined : { marginTop: 10 }}>
    <Icon name={icon} stroke="#1255be" /><span>{children}</span>
  </div>
);

export const SideWidget = ({ icon, title, children }) => (
  <div className="settings-side-widget">
    <div className="widget-title"><Icon name={icon} size={20} stroke="#1255be" /><span>{title}</span></div>
    {children}
  </div>
);

export const Info = ({ rows }) => (
  <div className="info-box">
    {rows.map(([k, v, c]) => <div key={k}>{k}: <strong style={c ? { color: c } : undefined}>{v}</strong></div>)}
  </div>
);

export function Banner({ icon, title, sub }) {
  const { t, go } = useHome();
  return (
    <div className="settings-header-banner">
      <div className="settings-banner-info">
        <h2><Icon name={icon} size={28} stroke="#6fc3ff" sw={2.2} /><span>{title}</span></h2>
        <p>{sub}</p>
      </div>
      <button className="btn-back-dash" onClick={() => go('dashboard')}>
        <Icon name="back" size={20} sw={2.5} className="flip" /><span>{t('backDash')}</span>
      </button>
    </div>
  );
}

export function Toast() {
  const { toast, t } = useHome();
  return (
    <div className={'toast-msg' + (toast.show ? ' show' : '')} role="status" aria-live="polite">
      <Icon name="info" stroke="#38bdf8" /><span>{t(toast.key)}</span>
    </div>
  );
}
