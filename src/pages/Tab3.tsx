import './Tab3.scss';

import { IonButton, IonContent, IonHeader, IonPage, IonToolbar, useIonModal } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';

import SamplingDataForm from '../components/SamplingDataForm/SamplingDataForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../store/actions/robot.actions';
import { RootState } from '../store/reducers';
import ChartVariable from '../components/ChartVariable/ChartVariable';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Tab3: React.FC = () => {
  const dispatch = useDispatch();
  const globalRobotState = useSelector((state: RootState) => state.robot);

  useEffect(() => {}, []);

  const [samplingParams, setSamplingParams] = useState<{
    sampleTime: number;
    variables: Array<string>;
  } | null>();

  const [startSampling, setStartSampling] = useState<boolean>(false);
  const timeIntervalHandler = useRef<any | null>();

  let timerPointer = useRef<number>(0);

  const [presentModal, dismissModal] = useIonModal(SamplingDataForm, {
    data: samplingParams,
    onDismiss: onCloseFormModalParams,
  });

  function onCloseFormModalParams(data: any) {
    if (data) {
      setSamplingParams(data);
      setStartSampling(true);
    }
    dismissModal();
  }

  function onStopSampling() {
    setStartSampling(false);
  }

  useEffect(() => {
    if (!startSampling) {
      clearInterval(timeIntervalHandler.current);
      timerPointer.current = 0;
      return;
    }
    timeIntervalHandler.current = setInterval(gettingDataState, samplingParams?.sampleTime);
  }, [startSampling]);

  async function gettingDataState() {
    timerPointer.current += (samplingParams?.sampleTime as number) / 1000;
    const inclination = 10*Math.sin(2 * 3.14159 * timerPointer.current);
    dispatch(updateState({ incliAngle: inclination }));
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {!startSampling && (
            <IonButton onClick={() => presentModal()} style={{ margin: '8px', width: '80%' }}>
              start sampling
            </IonButton>
          )}
          {startSampling && (
            <IonButton
              color='danger'
              onClick={onStopSampling}
              style={{ margin: '8px', width: '80%' }}
            >
              stop sampling
            </IonButton>
          )}
        </div>
        {/* ///////////////////////////////GRAFICAS //////////////////////////////////////// */}

        {startSampling && (
          <section style={{ boxSizing: 'border-box', padding: '2px' }}>
            {
              <ChartVariable
                name='Inclination'
                x={timerPointer.current}
                y={globalRobotState.incliAngle}
              />
            }
          </section>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
