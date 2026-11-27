import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/base.css';
import './styles/sidebar.css';
import './styles/header.css';
import './styles/cards.css';
import './styles/panels.css';
import './styles/settings.css';
import './styles/toast.css';
import './styles/mobile.css';
import './styles/login.css';

createRoot(document.getElementById('root')).render(<App />);
