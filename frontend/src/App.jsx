import { HomeProvider, useHome } from './context/HomeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useState } from 'react';
import Login from './views/Login';
import Signup from './views/Signup';
import { Verify, Forgot, Reset } from './views/Recovery';
import { Sidebar, BottomNav, Header } from './components/Layout';
import { Toast } from './components/ui';
import Dashboard from './views/Dashboard';
import Settings from './views/Settings';
import Logs from './views/Logs';
import About from './views/About';

const VIEWS = { dashboard: Dashboard, settings: Settings, logs: Logs, about: About };

function Shell() {
  const { view } = useHome();
  const View = VIEWS[view];
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header />
        <div className="view-container"><View /></div>
      </main>
      <BottomNav />
      <Toast />
    </div>
  );
}

function Gate() {
  const { session } = useAuth();
  const [s, setS] = useState({ mode: 'login', email: '', registration: null, notice: '' });
  const go = (mode, extra = {}) => setS((p) => ({ ...p, mode, notice: '', ...extra }));
  if (session) return <Shell />;
  const back = () => go('login');
  switch (s.mode) {
    case 'signup': return <Signup onBack={back} onDone={(email, registration) => go('verify', { email, registration })} />;
    case 'verify': return <Verify email={s.email} registration={s.registration} onBack={back} onDone={() => go('login', { notice: 'verifiedOk' })} />;
    case 'forgot': return <Forgot onBack={back} onDone={(email) => go('reset', { email })} />;
    case 'reset': return <Reset email={s.email} onBack={back} onDone={() => go('login', { notice: 'resetOk' })} />;
    default: return <Login notice={s.notice} onSignup={() => go('signup')} onForgot={() => go('forgot')} onVerify={(email) => go('verify', { email })} />;
  }
}

export default function App() {
  return <HomeProvider><AuthProvider><Gate /></AuthProvider></HomeProvider>;
}
