import { Banner } from '../components/ui';
import { useHome } from '../context/HomeContext';

export default function About() {
  const { t, go, openSettings } = useHome();
  return (
    <>
      <Banner icon="info" title={t('aboutTitle')} sub={t('aboutSub')} />
      <div className="panel" style={{ gap: 16 }}>
        <h3 style={{ color: '#0b2a5b' }}>{t('tagline')}</h3>
        <p style={{ color: '#48628b', lineHeight: 1.6 }}>{t('aboutBody')}</p>
        <div className="about-actions">
          <button className="action-btn" onClick={() => go('dashboard')}>{t('openDash')}</button>
          <button className="view-all-btn" onClick={() => openSettings('door')}>{t('configure')}</button>
        </div>
      </div>
    </>
  );
}
