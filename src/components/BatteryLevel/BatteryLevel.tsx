import { IonIcon, IonLabel, useIonToast } from '@ionic/react';
import { batteryFullOutline, batteryHalfOutline, batteryDeadOutline } from 'ionicons/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBatteryStatusArduino } from '../../service/arduino';
import { updateState } from '../../store/actions/robot.actions';
import { RootState } from '../../store/reducers';
import './BatteryLevel.scss';

const BetteryLevel = ({ slot = 'end' }: { slot?: 'end' | 'start' }) => {
  const { battery } = useSelector((state: RootState) => state.robot);
  const { isConnected } = useSelector((state: RootState) => state.bluetooth);
  const [present] = useIonToast();

  const dispatch = useDispatch();
  const SAMPLE_TIME_BATTERY = 1577;

  useEffect(() => {
    let timerInterval: any;
    if (isConnected) {
      timerInterval = setInterval(updateBattery, SAMPLE_TIME_BATTERY);
    } else {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isConnected]);

  async function updateBattery() {
    try {
      let bat = await getBatteryStatusArduino();
      bat = +bat.toFixed(0);
      dispatch(updateState({ battery: bat }));
    } catch (e: any) {
      present(`Error in bluetooth: ${e.message}`, 2500);
    }
  }

  return (
    <div className='BatteryLevel' slot={slot}>
      <IonLabel className='label'>{battery + '%'}</IonLabel>
      <IonLabel className='icon'>
        <IonIcon
          style={{ color: '#fff', fontSize: '24px' }}
          icon={getIcon(battery)}
          color={getColor(battery)}
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
