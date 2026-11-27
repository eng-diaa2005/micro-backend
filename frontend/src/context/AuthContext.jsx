import { createContext, useCallback, useContext, useState } from 'react';
import * as auth from '../services/auth';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(auth.getSession);
  const signIn = useCallback(async (creds, remember) => setSession(await auth.login(creds, remember)), []);
  const signOut = useCallback(() => { auth.logout(); setSession(null); }, []);
  return <Ctx.Provider value={{ session, signIn, signOut, signUp: auth.signup }}>{children}</Ctx.Provider>;
}
