import { Banner } from '../components/ui';
import { Timeline } from '../components/Panels';
import { useHome } from '../context/HomeContext';

export default function Logs() {
  const { t, logs } = useHome();
  return (
    <>
      <Banner icon="logs" title={t('logsTitle')} sub={t('logsSub')} />
      <div className="panel"><Timeline items={logs} long /></div>
    </>
  );
}
