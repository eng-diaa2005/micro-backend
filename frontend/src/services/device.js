import { authHeader, getSession } from './auth';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const request = async (path, options = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.message || 'Device request failed'), { status: res.status });
  return data;
};

export const getDeviceStatus = () => {
  const session = getSession();
  if (!session?.deviceId) return Promise.resolve(null);
  return request(`/device/status/${encodeURIComponent(session.deviceId)}`);
};

export const controlGarage = (action) => request('/device/garage', { method: 'POST', body: JSON.stringify({ action }) });
export const controlApartment = (action) => request('/device/apartment', { method: 'POST', body: JSON.stringify({ action }) });
export const controlFan = (action) => request('/device/fan', { method: 'POST', body: JSON.stringify({ action }) });
export const updateFanThreshold = (fanOnTemp, fanOffTemp) =>
  request('/device/fan/threshold', { method: 'POST', body: JSON.stringify({ fanOnTemp, fanOffTemp }) });
export const updateApartmentPassword = (newPassword, confirmPassword) =>
  request('/device/apartment/password', { method: 'POST', body: JSON.stringify({ newPassword, confirmPassword }) });
