import { useState } from 'react';
import Icon from '../components/Icon';
import AuthShell, { Field } from '../components/AuthShell';
import { useHome } from '../context/HomeContext';
import { useAuth } from '../context/AuthContext';
import { DEMO, errorKey, lastDevice } from '../services/auth';

export default function Login({ notice, onSignup, onForgot, onVerify }) {
  const { t } = useHome();
  const { signIn } = useAuth();
  const [f, setF] = useState({ email: '', password: '', deviceId: lastDevice(), remember: true });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      await signIn({ email: f.email.trim().toLowerCase(), password: f.password, deviceId: f.deviceId.trim() }, f.remember);
    } catch (ex) { setErr(errorKey(ex)); setBusy(false); }
  };

  return (
    <AuthShell title={t('loginTitle')} sub={t('loginSub')} onSubmit={submit}>
      {notice && <div className="login-ok" role="status">{t(notice)}</div>}
      <Field icon="user" id="lg-email" label={t('email')}>
        <input id="lg-email" type="email" autoComplete="email" autoCapitalize="none" required value={f.email} onChange={set('email')} />
      </Field>
      <Field icon="lock" id="lg-pass" label={t('password')}>
        <input id="lg-pass" type={show ? 'text' : 'password'} autoComplete="current-password" required value={f.password} onChange={set('password')} />
        <button type="button" className="login-eye" aria-label={t(show ? 'hidePw' : 'showPw')} onClick={() => setShow(!show)}>
          <Icon name={show ? 'eyeoff' : 'eye'} size={20} />
        </button>
      </Field>
      <button type="button" className="login-forgot" onClick={onForgot}>{t('forgotLink')}</button>
      <Field icon="wifi" id="lg-device" label={t('deviceId')}>
        <input id="lg-device" autoCapitalize="none" autoComplete="off" spellCheck={false} required placeholder="e.g. HOME-ESP-001" value={f.deviceId} onChange={set('deviceId')} />
      </Field>
      <label className="login-remember">
        <input type="checkbox" checked={f.remember} onChange={(e) => setF({ ...f, remember: e.target.checked })} />
        <span>{t('remember')}</span>
      </label>
      {err && <div className="login-error" role="alert">{t(err)}</div>}
      {err === 'notActivated' && <button type="button" className="login-forgot" onClick={() => onVerify(f.email.trim().toLowerCase())}>{t('verifyNow')}</button>}
      <button className="action-btn" type="submit" disabled={busy}>{t(busy ? 'signingIn' : 'signIn')}</button>
      <p className="login-link">{t('noAccount')} <button type="button" onClick={onSignup}>{t('signUp')}</button></p>
      {DEMO && <p className="login-hint">{t('demoHint')}</p>}
    </AuthShell>
  );
}
