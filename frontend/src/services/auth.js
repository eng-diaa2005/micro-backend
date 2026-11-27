// Set VITE_API_URL to use a different backend, otherwise the Vite dev server proxies /auth and /device.
export const DEMO = false;
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export const ENDPOINTS = {
  login: '/auth/login',
  signup: '/auth/verify',       // Sends activation OTP
  verify: '/auth/register',     // Registers with the OTP
  resend: '/auth/verify',
  forgot: '/auth/forget-pass',
  reset: '/auth/reset-pass',
};
const KEY = 'smart-home-auth';
const DEVICE_KEY = 'smart-home-device';

const fail = (status) => Object.assign(new Error('request-failed'), { status });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const post = async (url, body) => {
  const res = await fetch(`${API_BASE}${url}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw Object.assign(new Error(data.message || 'request-failed'), { status: res.status });
  }
  return res.json().catch(() => ({}));
};

export const errorKey = (e, ctx) => {
  if (ctx === 'otp' && [400, 401, 422].includes(e.status)) return 'badOtp';
  if (ctx === 'otp' && e.status === 410) return 'otpExpired';
  if (ctx === 'signup' && e.status === 400) return 'signupInvalid';
  return { 400: 'requestInvalid', 401: 'badCreds', 403: 'notActivated', 404: 'deviceNotFound', 409: 'emailTaken' }[e.status] || 'serverErr';
};
export const lastDevice = () => { try { return localStorage.getItem(DEVICE_KEY) || ''; } catch { return ''; } };
export const getSession = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || sessionStorage.getItem(KEY)); } catch { return null; }
};

export async function login({ email, password, deviceId }, remember) {
  let data;
  if (DEMO) { // Placeholder only: runs in the browser, NOT secure.
    await wait(500);
    if (email !== 'admin@home.com' || password !== '123456') throw fail(401);
    data = { token: 'demo-token', user: { userName: 'Admin', email } };
  } else {
    data = await post(ENDPOINTS.login, { email, password, deviceId });
  }
  if (!DEMO) data = { ...data, token: data.access_token, user: data.user };
  const session = { ...data, deviceId };
  (remember ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(session));
  try { localStorage.setItem(DEVICE_KEY, deviceId); } catch { /* ignore */ }
  return session;
}

export async function signup(payload) {
  if (DEMO) { await wait(600); return {}; }
  return post(ENDPOINTS.signup, { email: payload.email });
}

const DEMO_OTP = '123456';
export async function verifyEmail(email, otp, payload) {
  if (DEMO) { await wait(500); if (otp !== DEMO_OTP) throw fail(400); return {}; }
  return post(ENDPOINTS.verify, { ...payload, email, otp, confirmPassword: payload.password });
}
export const resendOtp = (email) => (DEMO ? wait(400) : post(ENDPOINTS.resend, { email }));
export const forgotPassword = (email) => (DEMO ? wait(500) : post(ENDPOINTS.forgot, { email }));
export async function resetPassword({ email, otp, password }) {
  if (DEMO) { await wait(500); if (otp !== DEMO_OTP) throw fail(400); return {}; }
  return post(ENDPOINTS.reset, { email, otp, password, confirmPassword: password });
}

export const logout = () => { localStorage.removeItem(KEY); sessionStorage.removeItem(KEY); };

// Use in every API call: fetch(url, { headers: { ...authHeader() } })
export const authHeader = () => { const s = getSession(); return s ? { Authorization: `Bearer ${s.token}` } : {}; };
