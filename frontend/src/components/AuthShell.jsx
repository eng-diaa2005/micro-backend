import Icon from './Icon';
import { Logo } from './art';
import { useHome } from '../context/HomeContext';

export function Field({ icon, id, label, children }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className="login-field"><Icon name={icon} size={20} />{children}</div>
    </>
  );
}

export default function AuthShell({ title, sub, onSubmit, children }) {
  const { t, toggleLang } = useHome();
  return (
    <div className="login-page">
      <button className="lang-toggle login-lang" onClick={toggleLang}>{t('langBtn')}</button>
      <form className="login-card" onSubmit={onSubmit}>
        <div className="login-brand"><Logo /></div>
        <h1>{title}</h1>
        <p className="login-sub">{sub}</p>
        {children}
      </form>
    </div>
  );
}
