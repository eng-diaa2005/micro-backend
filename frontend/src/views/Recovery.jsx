import { useEffect, useState } from 'react';
import AuthShell, { Field } from '../components/AuthShell';
import { useHome } from '../context/HomeContext';
import { DEMO, errorKey, verifyEmail, resendOtp, forgotPassword, resetPassword } from '../services/auth';

function useCooldown(sec) {
  const [left, setLeft] = useState(sec);
  useEffect(() => {
    if (left <= 0) return;
    const id = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(id);
  }, [left]);
  return [left, () => setLeft(sec)];
}

const Msg = ({ m, t }) => m.k ? <div className={m.ok ? 'login-ok' : 'login-error'} role="alert">{t(m.k)}</div> : null;
const Back = ({ onBack, t }) => <p className="login-link"><button type="button" onClick={onBack}>{t('backToLogin')}</button></p>;
const Email = ({ email }) => <strong dir="ltr">{email}</strong>;

const OtpField = ({ value, onChange, t }) => (
  <Field icon="shield" id="otp" label={t('otpLabel')}>
    <input id="otp" className="otp-input" inputMode="numeric" autoComplete="one-time-code" maxLength={6} pattern="\d{6}" required
      placeholder="••••••" value={value} onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))} />
  </Field>
);

export function Verify({ email, registration, onDone, onBack }) {
  const { t } = useHome();
  const [otp, setOtp] = useState('');
  const [busy, setBusy] = useState(false);
  const [m, setM] = useState({ k: '' });
  const [left, restart] = useCooldown(30);

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setM({ k: '' });
    try { await verifyEmail(email, otp, registration); onDone(); } catch (ex) { setM({ k: errorKey(ex, 'otp') }); setBusy(false); }
  };
  const resend = async () => {
    try { await resendOtp(email); restart(); setM({ k: 'resent', ok: true }); } catch (ex) { setM({ k: errorKey(ex) }); }
  };

  return (
    <AuthShell title={t('verifyTitle')} sub={<>{t('verifySub')} <Email email={email} /></>} onSubmit={submit}>
      <OtpField value={otp} onChange={setOtp} t={t} />
      <Msg m={m} t={t} />
      <button className="action-btn" type="submit" disabled={busy || otp.length !== 6} style={{ marginTop: 10 }}>{t('verify')}</button>
      <p className="login-link">
        <button type="button" disabled={left > 0} onClick={resend}>{left > 0 ? `${t('resendIn')} ${left}s` : t('resend')}</button>
      </p>
      <Back onBack={onBack} t={t} />
      {DEMO && <p className="login-hint">{t('demoOtp')}</p>}
    </AuthShell>
  );
}

export function Forgot({ onDone, onBack }) {
  const { t } = useHome();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [m, setM] = useState({ k: '' });

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setM({ k: '' });
    const addr = email.trim().toLowerCase();
    try { await forgotPassword(addr); }
    catch (ex) { if (ex.status !== 404) { setM({ k: errorKey(ex) }); setBusy(false); return; } } // never reveal whether an email exists
    onDone(addr);
  };

  return (
    <AuthShell title={t('forgotTitle')} sub={t('forgotSub')} onSubmit={submit}>
      <Field icon="user" id="fp-email" label={t('email')}>
        <input id="fp-email" type="email" autoComplete="email" autoCapitalize="none" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Msg m={m} t={t} />
      <button className="action-btn" type="submit" disabled={busy} style={{ marginTop: 10 }}>{t('sendCode')}</button>
      <Back onBack={onBack} t={t} />
    </AuthShell>
  );
}

export function Reset({ email, onDone, onBack }) {
  const { t } = useHome();
  const [f, setF] = useState({ otp: '', password: '', confirm: '' });
  const [busy, setBusy] = useState(false);
  const [m, setM] = useState({ k: '' });
  const [left, restart] = useCooldown(30);

  const submit = async (e) => {
    e.preventDefault();
    if (f.password !== f.confirm) return setM({ k: 'pwMismatch' });
    setBusy(true); setM({ k: '' });
    try { await resetPassword({ email, otp: f.otp, password: f.password }); onDone(); }
    catch (ex) { setM({ k: errorKey(ex, 'otp') }); setBusy(false); }
  };
  const resend = async () => {
    try { await forgotPassword(email); restart(); setM({ k: 'resent', ok: true }); } catch (ex) { setM({ k: errorKey(ex) }); }
  };

  return (
    <AuthShell title={t('resetTitle')} sub={<>{t('resetSub')} <Email email={email} /></>} onSubmit={submit}>
      <OtpField value={f.otp} onChange={(otp) => setF({ ...f, otp })} t={t} />
      <Field icon="lock" id="rs-pass" label={t('newPw')}>
        <input id="rs-pass" type="password" autoComplete="new-password" required minLength={6} maxLength={90} value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
      </Field>
      <Field icon="lock" id="rs-conf" label={t('confirmPw')}>
        <input id="rs-conf" type="password" autoComplete="new-password" required value={f.confirm} onChange={(e) => setF({ ...f, confirm: e.target.value })} />
      </Field>
      <Msg m={m} t={t} />
      <button className="action-btn" type="submit" disabled={busy} style={{ marginTop: 10 }}>{t('resetBtn')}</button>
      <p className="login-link">
        <button type="button" disabled={left > 0} onClick={resend}>{left > 0 ? `${t('resendIn')} ${left}s` : t('resend')}</button>
      </p>
      <Back onBack={onBack} t={t} />
      {DEMO && <p className="login-hint">{t('demoOtp')}</p>}
    </AuthShell>
  );
}
