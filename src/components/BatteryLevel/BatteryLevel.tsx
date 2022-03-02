import { IonIcon, IonLabel } from '@ionic/react';
import { batteryFullOutline, batteryHalfOutline, batteryDeadOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import './BatteryLevel.scss';

const BetteryLevel = ({ slot = 'end' }: { slot?: 'end' | 'start' }) => {
  const { battery } = useSelector((state: RootState) => state.robot);
  // const { isConnected } = useSelector((state: RootState) => state.bluetooth);

  return (
    <div className='BatteryLevel' slot={slot}>
      <IonLabel className='label'>{battery + '%'}</IonLabel>
      <IonLabel className='icon'>
        <IonIcon
          style={{ color: '#fff', fontSize: '24px' }}
          icon={getIcon(battery || 0)}
          color={getColor(battery || 0)}
        />
      </IonLabel>
    </div>
  );

  function getIcon(bat: number) {
    if (bat > 80) return batteryFullOutline;
    if (bat <= 80 && bat >= 50) return batteryHalfOutline;
    if (bat < 50) return batteryDeadOutline;
  }
  function getColor(bat: number) {
    if (bat > 80) return 'primary';
    if (bat <= 80 && bat >= 50) return 'warning';
    if (bat < 50) return 'danger';
  }
};

export default BetteryLevel;
