import { useState } from 'react';
import AuthShell, { Field } from '../components/AuthShell';
import { useHome } from '../context/HomeContext';
import { useAuth } from '../context/AuthContext';
import { errorKey } from '../services/auth';

export default function Signup({ onDone, onBack }) {
  const { t } = useHome();
  const { signUp } = useAuth();
  const [f, setF] = useState({ userName: '', email: '', phoneNumber: '', gender: '', password: '', confirm: '' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (f.password !== f.confirm) return setErr('pwMismatch');
    setBusy(true); setErr('');
    const { confirm, ...body } = f;
    try {
      const payload = { ...body, userName: body.userName.trim(), email: body.email.trim().toLowerCase(), phoneNumber: body.phoneNumber.trim() };
      await signUp(payload);
      onDone(payload.email, payload);
    }
    catch (ex) { setErr(errorKey(ex, 'signup')); setBusy(false); }
  };

  return (
    <AuthShell title={t('signupTitle')} sub={t('signupSub')} onSubmit={submit}>
      <Field icon="user" id="su-name" label={t('username')}>
        <input id="su-name" autoComplete="username" autoCapitalize="none" required minLength={3} maxLength={30} value={f.userName} onChange={set('userName')} />
      </Field>
      <Field icon="info" id="su-email" label={t('email')}>
        <input id="su-email" type="email" autoComplete="email" autoCapitalize="none" required value={f.email} onChange={set('email')} />
      </Field>
      <Field icon="bell" id="su-phone" label={t('phone')}>
        <input id="su-phone" type="tel" inputMode="tel" autoComplete="tel" required value={f.phoneNumber} onChange={set('phoneNumber')} />
      </Field>
      <Field icon="user" id="su-gender" label={t('gender')}>
        <select id="su-gender" required value={f.gender} onChange={set('gender')}>
          <option value="" disabled>—</option>
          <option value="male">{t('male')}</option>
          <option value="female">{t('female')}</option>
        </select>
      </Field>
      <Field icon="lock" id="su-pass" label={t('password')}>
        <input id="su-pass" type="password" autoComplete="new-password" required minLength={6} maxLength={90} value={f.password} onChange={set('password')} />
      </Field>
      <Field icon="lock" id="su-conf" label={t('confirmPw')}>
        <input id="su-conf" type="password" autoComplete="new-password" required value={f.confirm} onChange={set('confirm')} />
      </Field>
      {err && <div className="login-error" role="alert">{t(err)}</div>}
      <button className="action-btn" type="submit" disabled={busy} style={{ marginTop: 10 }}>{t(busy ? 'signingIn' : 'createAccount')}</button>
      <p className="login-link">{t('haveAccount')} <button type="button" onClick={onBack}>{t('signIn')}</button></p>
    </AuthShell>
  );
}
