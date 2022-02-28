import './Tab3.scss';

import { IonButton, IonContent, IonHeader, IonPage, IonToolbar, useIonModal } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';

import SamplingDataForm from '../components/SamplingDataForm/SamplingDataForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../store/actions/robot.actions';
import Chart from '../components/Chart/Chart';
import { RootState } from '../store/reducers';

const Tab3: React.FC = () => {
  const dispatch = useDispatch();
  const globalRobotState = useSelector((state: RootState) => state.robot);

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
      return;
    }
    timeIntervalHandler.current = setInterval(gettingDataState, samplingParams?.sampleTime);
  }, [startSampling]);

  async function gettingDataState() {
    timerPointer.current += (samplingParams?.sampleTime as number) / 1000;
    const inclination = Math.sin(2 * 3.14159 * timerPointer.current);
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
          <>
            {<Chart name='Inclination' x={timerPointer.current} y={globalRobotState.incliAngle} />}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
function userRef() {
  throw new Error('Function not implemented.');
}
