import { DoorCard, GateCard, FanCard } from '../components/DeviceCards';
import { StatusPanel, ActivityPanel } from '../components/Panels';
import { useHome } from '../context/HomeContext';

export default function Dashboard() {
  const { t } = useHome();
  return (
    <>
      <div className="title-header"><h1>{t('headTitle')}</h1><p>{t('headSub')}</p></div>
      <section className="cards-grid"><DoorCard /><GateCard /><FanCard /></section>
      <section className="bottom-panels"><StatusPanel /><ActivityPanel /></section>
    </>
  );
}
