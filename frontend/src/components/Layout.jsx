import Icon from './Icon';
import { Waves, Logo, SideArt } from './art';
import { useHome } from '../context/HomeContext';
import { useAuth } from '../context/AuthContext';

const NAV = [['dashboard', 'home', 'dash'], ['settings', 'gear', 'settings'], ['logs', 'logs', 'logs'], ['about', 'info', 'about']];

export function Sidebar() {
  const { t, view, go } = useHome();
  const [a, b] = t('appTitle').split('<br>');
  return (
    <aside className="side">
      <Waves />
      <div className="logo-box"><Logo /><span>{a}<br />{b}</span></div>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {NAV.map(([id, icon, k]) => (
          <button key={id} className={'nav-btn' + (view === id ? ' on' : '')} onClick={() => go(id)}>
            <Icon name={icon} size={23} /><span>{t(k)}</span>
          </button>
        ))}
      </nav>
      <div className="side-art"><SideArt /><div className="tagline">{t('tagline')}</div></div>
    </aside>
  );
}

export function BottomNav() {
  const { t, view, go } = useHome();
  return (
    <nav className="bottom-nav" aria-label="Main">
      {NAV.map(([id, icon, k]) => (
        <button key={id} className={view === id ? 'on' : ''} onClick={() => go(id)}>
          <Icon name={icon} size={22} /><span>{t(k)}</span>
        </button>
      ))}
    </nav>
  );
}

export function Header() {
  const { t, toggleLang, notify, demo } = useHome();
  const { session, signOut } = useAuth();
  return (
    <header className="top-bar">
      <div className="mobile-brand"><Logo /><span>{t('appTitle').replace('<br>', ' ')}</span></div>
      <div className="search-pill">
        <Icon name="search" stroke="#0b2a5b" sw={2.3} />
        <input type="text" placeholder={t('search')} aria-label={t('search')} />
      </div>
      <div className="header-tools">
        {demo && <div className="demo-badge"><span className="demo-dot" /><span>{t('demo')}</span></div>}
        <button className="lang-toggle" onClick={toggleLang}>{t('langBtn')}</button>
        <button className="icon-btn" aria-label="Notifications" onClick={() => notify('tNoAlerts')}>
          <Icon name="bell" /><span className="notif-dot" />
        </button>
        <button className="avatar" aria-label="Admin" onClick={() => notify('tAdmin')} title={session?.user?.name}><Icon name="user" /></button>
        <button className="icon-btn logout-btn" aria-label={t('logout')} title={t('logout')} onClick={() => { signOut(); }}><Icon name="logout" /></button>
      </div>
    </header>
  );
}
