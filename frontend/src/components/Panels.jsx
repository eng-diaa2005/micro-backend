import Icon from './Icon';
import { StatusDoor, StatusGate, MiniFan } from './art';
import { useHome } from '../context/HomeContext';

export function Timeline({ items, long }) {
  const { t } = useHome();
  return (
    <div className="timeline">
      {items.map((e) => (
        <div className="timeline-item" key={e.id}>
          <div className="timeline-dot" />
          <div className="timeline-time">{long ? e.time : e.time.slice(0, 5)}</div>
          <Icon name={e.icon} stroke="#123a7a" />
          <div className="timeline-text">{t(long && e.long ? e.long : e.key)}</div>
        </div>
      ))}
    </div>
  );
}

export function StatusPanel() {
  const { t, dev } = useHome();
  const items = [
    [<StatusDoor />, 'lblDoor', dev.door === 'Locked' ? 'sLocked' : 'sUnlocked'],
    [<StatusGate />, 'lblGate', dev.gate === 'Open' ? 'sOpen' : 'sClosed'],
    [<MiniFan spin={dev.fan === 'ON'} />, 'lblFan', dev.fan === 'ON' ? 'sOn' : 'sOff'],
  ];
  return (
    <div className="panel">
      <div className="panel-header"><div className="panel-title"><Icon name="chart" size={26} sw={2.5} /><span>{t('sysStatus')}</span></div></div>
      <div className="status-columns">
        {items.map(([icon, label, val]) => (
          <div className="status-item" key={label}>{icon}<span>{t(label)}</span><span className="status-indicator-tag">{t(val)}</span></div>
        ))}
      </div>
    </div>
  );
}

export function ActivityPanel() {
  const { t, logs, go } = useHome();
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title"><Icon name="clock" size={26} sw={2.2} /><span>{t('recentAct')}</span></div>
        <button className="view-all-btn" onClick={() => go('logs')}>
          <span>{t('viewAll')}</span><Icon name="arrow" size={16} sw={2.5} className="flip" />
        </button>
      </div>
      <Timeline items={logs.slice(0, 3)} />
    </div>
  );
}
