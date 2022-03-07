/* eslint-disable react-hooks/exhaustive-deps */
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  useIonToast,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Canvas2DRobot from '../components/Canvas2DRobot/Canvas2DRobot';
import { updateState } from '../store/actions/robot.actions';
import ShowState from '../components/ShowState/ShowState';
import './Autonomus.scss';
import {
  resetDynamicalStateArduino,
  setRobotPointTrakerArduino,
  setRobotSetPointSpeedsArduino,
} from '../services/arduino';
import { RootState } from '../store/reducers';
import { errorDeviceConnection } from '../store/actions/bluetooth.actions';

const Autonomus = () => {
  const [startPath, setStartPath] = useState(false);
  const [setPoint, setSetPoint] = useState([0, 0]);
  const { isConnected } = useSelector((state: RootState) => state.bluetooth);
  const dispatch = useDispatch();
  const [presentToast] = useIonToast();

  async function initPointTraker(x: any, y: any) {
    try {
      if (!isConnected) {
        presentToast('You must to be connected to the robot', 2000);
        return;
      }
      setStartPath(true);
      setSetPoint([x, -1 * y]);
      await setRobotPointTrakerArduino(y, -1 * x);
      dispatch(updateState({ startSampling: true }));
    } catch (e: any) {
      dispatch(errorDeviceConnection(e.message || 'Lost connection'));
    }
  }

  async function onStopSampling() {
    try {
      await setRobotSetPointSpeedsArduino(0, 0);
      dispatch(updateState({ startSampling: false }));
      setStartPath(false);
    } catch (e: any) {
      dispatch(errorDeviceConnection(e.message || 'Lost connection'));
    }
  }

  async function onResetStateArduino() {
    try {
      await onStopSampling();
      await resetDynamicalStateArduino();
      dispatch(updateState({ posX: 0, posY: 0, robotOrien: 0 }));
    } catch (e: any) {
      dispatch(errorDeviceConnection(e.message || 'Lost connection'));
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <br />
        <Canvas2DRobot start={startPath} goToPoint={initPointTraker} setPoint={setPoint} />
        <br />
        <ShowState variables={['position']} />

        <IonList style={{ marginTop: '1px' }}>
          <IonItem disabled={!isConnected}>
            <IonLabel>Actions:</IonLabel>
            <IonLabel slot='end'>
              <IonButton color='danger' onClick={onStopSampling}>
                Stop
              </IonButton>
              <IonButton onClick={onResetStateArduino}>Reset state</IonButton>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Autonomus;
