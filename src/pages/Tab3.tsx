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
import ShowState from '../components/ShowState/ShowState';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Tab3: React.FC = () => {
  const dispatch = useDispatch();
  const globalRobotState = useSelector((state: RootState) => state.robot);

  useEffect(() => {}, []);

  const [samplingParams, setSamplingParams] = useState<{
    sampleTime: number;
    variables: Array<string>;
    showChart: boolean;
    showTable: boolean;
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
      dispatch(updateState({ startSampling: true }));
    }
    dismissModal();
  }

  function onStopSampling() {
    setStartSampling(false);
    dispatch(updateState({ startSampling: false }));
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
    const inclination = 10 * Math.sin(2 * 3.14159 * timerPointer.current);
    const x = Math.random() * 5;
    const y = -3.5 * x + 2;
    dispatch(updateState({ incliAngle: inclination, posX: x, posY: y }));
  }

  function getDataToPlotFromSettings(variable: string) {
    switch (variable) {
      case 'incliAngle':
        return {
          name: 'Inclination angle[deg] vs t[s]',
          color: '#1976d2',
          x: timerPointer.current,
          y: (globalRobotState as any)[variable],
        };
      case 'linearVelocity':
        return {
          name: 'Velocity angle[m/s] vs t[s]',
          color: '#d32f2f',
          x: timerPointer.current,
          y: (globalRobotState as any)[variable],
        };
      case 'angularVelocity':
        return {
          name: 'Angular vel.[rad/s] vs t[s]',
          color: '#fb8c00',
          x: timerPointer.current,
          y: (globalRobotState as any)[variable],
        };
      case 'position':
        return {
          name: 'PosY[m] vs PosX[m] ',
          color: '#388e3c',
          x: globalRobotState.posX,
          y: globalRobotState.posY,
        };
    }
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

        {samplingParams?.showChart && (
          <>
            {samplingParams?.variables?.map((value: string) => {
              const { name, color, x, y }: any = getDataToPlotFromSettings(value);
              let labelX = value == 'position' ? (x || 0.0).toFixed(2) : '';
              return (
                <ChartVariable key={value} name={name} color={color} x={x} y={y} labelX={labelX} />
              );
            })}
          </>
        )}
        {samplingParams?.showTable && (
          <>
            <br />
            <ShowState variables={samplingParams?.variables} />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
