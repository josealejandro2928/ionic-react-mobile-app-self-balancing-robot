/* eslint-disable react-hooks/exhaustive-deps */
import './Tab3.scss';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToggle,
  IonToolbar,
  useIonModal,
  useIonToast,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';

import SamplingDataForm from '../components/SamplingDataForm/SamplingDataForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, getRobotState } from '../store/actions/robot.actions';
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
import './Tab3.scss';
import { resetDynamicalStateArduino } from '../services/arduino';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Tab3: React.FC = () => {
  const dispatch = useDispatch();
  const globalRobotState = useSelector((state: RootState) => state.robot);
  const startSampling = useSelector((state: RootState) => state.robot.startSampling);
  const { isConnected } = useSelector((state: RootState) => state.bluetooth);
  const [presentToast] = useIonToast();

  useEffect(() => {}, []);

  const [samplingParams, setSamplingParams] = useState<{
    sampleTime: number;
    variables: Array<string>;
    dataDisplayed: string;
  } | null>({
    sampleTime: 150,
    variables: ['incliAngle', 'linearVelocity'],
    dataDisplayed: 'table',
  });

  const timeIntervalHandler = useRef<any | null>();
  let timerPointer = useRef<number>(0);
  const [showData, setShowData] = useState<boolean>(true);

  const [presentModal, dismissModal] = useIonModal(SamplingDataForm, {
    data: samplingParams,
    onDismiss: onCloseFormModalParams,
  });

  function onCloseFormModalParams(data: any) {
    if (data) {
      setSamplingParams(data);
      dispatch(updateState({ startSampling: true }));
    }
    dismissModal();
  }

  function onStopSampling() {
    dispatch(updateState({ startSampling: false }));
  }

  useEffect(() => {
    if (!isConnected) {
      presentToast('You must to be connected to the robot', 2000);
    }
    if (!startSampling || !isConnected) {
      clearInterval(timeIntervalHandler.current);
      timerPointer.current = 0;
      return;
    }
    timeIntervalHandler.current = setInterval(gettingDataState, samplingParams?.sampleTime);
  }, [startSampling, isConnected]);

  async function gettingDataState() {
    timerPointer.current += (samplingParams?.sampleTime as number) / 1000;
    dispatch(getRobotState());
    // dispatch(updateState({ incliAngle: 5 * Math.sin(2 * Math.PI * timerPointer.current) }));
  }

  function getDataToPlotFromSettings(variable: string) {
    switch (variable) {
      case 'incliAngle':
        return {
          name: 'Inclination[deg] vs t[s]',
          color: '#1976d2',
          x: timerPointer.current,
          y: (globalRobotState as any)[variable],
          yRangeAxis: [-20, 20],
        };
      case 'linearVelocity':
        return {
          name: 'Velocity[m/s] vs t[s]',
          color: '#d32f2f',
          x: timerPointer.current,
          y: (globalRobotState as any)[variable],
          yRangeAxis: [-2, 2],
        };
      case 'angularVelocity':
        return {
          name: 'Angular vel.[rad/s] vs t[s]',
          color: '#fb8c00',
          x: timerPointer.current,
          y: (globalRobotState as any)[variable],
          yRangeAxis: [-4, 4],
        };
      case 'position':
        return {
          name: 'PosY[m] vs PosX[m] ',
          color: '#388e3c',
          x: globalRobotState.posX,
          y: globalRobotState.posY,
          yRangeAxis: [-1, 1],
          xRangeAxis: [-1, 1],
        };
    }
  }

  async function onResetStateArduino() {
    try {
      await resetDynamicalStateArduino();
      dispatch(updateState({ posX: 0, posY: 0, robotOrien: 0 }));
    } catch (e) {}
  }

  return (
    <IonPage className='Tab3'>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0px' }}>
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
        <IonList>
          <IonItem>
            <IonLabel>show data</IonLabel>
            <IonToggle
              slot='end'
              checked={showData}
              onIonChange={(e: any) => setShowData(e.detail.checked)}
            />
          </IonItem>
        </IonList>
        {/* ///////////////////////////////GRAFICAS //////////////////////////////////////// */}
        {showData && (
          <>
            {samplingParams?.dataDisplayed === 'chart' && (
              <>
                {samplingParams?.variables?.map((value: string) => {
                  const { name, color, x, y, yRangeAxis, xRangeAxis }: any =
                    getDataToPlotFromSettings(value);
                  let labelX = value === 'position' ? (x || 0.0).toFixed(2) : '';
                  return (
                    <ChartVariable
                      key={value}
                      name={name}
                      color={color}
                      x={x}
                      y={y}
                      labelX={labelX}
                      yRangeAxis={yRangeAxis}
                      xRangeAxis={xRangeAxis}
                    />
                  );
                })}
              </>
            )}
            {samplingParams?.dataDisplayed === 'table' && (
              <>
                <br />
                <ShowState variables={samplingParams?.variables} />
              </>
            )}
          </>
        )}

        <IonList style={{ marginTop: '1px' }}>
          <IonItem disabled={!isConnected}>
            <IonLabel>Actions:</IonLabel>
            <IonLabel slot='end'>
              <IonButton onClick={onResetStateArduino}>Reset state</IonButton>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
