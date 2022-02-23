import {
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonRange,
  IonToggle,
  useIonToast,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import './PIDParameters.scss';

import {
  getConstantPIDAngularVelocity,
  getConstantPIDVelocity,
  getConstantPIDInclination,
  setConstantPIDInclination,
  setConstantPIDVelocity,
  setConstantPIDAngularVelocity,
  delayMs,
} from '../../service/arduino';

const PIDParameters = () => {
  const iKc = 23.75;
  const iKi = 20;
  const iKd = 2;
  const vKc = 10;
  const vKi = 6;
  const vKd = 0.15;
  const rKc = 18.5;
  const rKi = 10.5;
  const rKd = 0.125;

  const [ctrAngle, setCtrAngle] = useState<Array<number>>([iKc, iKi, iKd]);
  const [ctrVel, setCtrVel] = useState<Array<number>>([vKc, vKi, vKd]);
  const [ctrRot, setCtrRot] = useState<Array<number>>([rKc, rKi, rKd]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const [editCtrAngle, setEditCtrAngle] = useState(false);
  const [editCtrVel, setEditCtrVel] = useState(false);
  const [editCtrRot, setEditCtrRot] = useState(false);
  const [present] = useIonToast();
  const { isConnected } = useSelector((state: RootState) => state.bluetooth);

  useEffect(() => {
    if (isConnected) {
      getData();
    } else {
      present('Your device is not connected, you are not allowed to change the parameters.', 3000);
    }
  }, [isConnected]);

  ///////////GETTING THE CURRENT PARAMETTERS OF THE CONTROLLERS ////////////////////////////
  async function getData() {
    try {
      await delayMs(130);
      const dataAngle = await getConstantPIDInclination();
      setCtrAngle(dataAngle);
      await delayMs(230);
      const dataVel = await getConstantPIDVelocity();
      setCtrVel(dataVel);
      await delayMs(230);
      const dataRot = await getConstantPIDAngularVelocity();
      setCtrRot(dataRot);
      await delayMs(500);
      setFirstLoad(false);
    } catch (e) {
      present('The Robot is not connected, or something happend', 2000);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  function pinFormater(value: number) {
    return value.toFixed(1);
  }

  async function setAngleCtrNewValue(data: any, index: number) {
    if (firstLoad) return;
    let newValue = [...ctrAngle];
    newValue[index] = data.target.value;
    try {
      setCtrAngle([...newValue]);
      await setConstantPIDInclination(newValue[0], newValue[1], newValue[2]);
    } catch (e) {
      present('Error: Something happend sending the PID Inclination Parameters');
    }
  }

  async function setVelCtrNewValue(data: any, index: number) {
    if (firstLoad) return;
    let newValue = [...ctrVel];
    newValue[index] = data.target.value;
    try {
      setCtrVel([...newValue]);
      await setConstantPIDVelocity(newValue[0], newValue[1], newValue[2]);
    } catch (e) {
      present('Error: Something happend sending the PID Velocity Parameters');
    }
  }

  async function setRotCtrNewValue(data: any, index: number) {
    if (firstLoad) return;
    let newValue = [...ctrRot];
    newValue[index] = data.target.value;
    try {
      setCtrRot([...newValue]);
      await setConstantPIDAngularVelocity(newValue[0], newValue[1], newValue[2]);
    } catch (e) {
      present('Error: Something happend sending the PID Velocity Parameters');
    }
  }

  return (
    <div className='PIDParameters'>
      <IonList>
        <IonItemDivider>
          <IonLabel>Inclination PID Controller</IonLabel>
          <IonToggle
            slot='end'
            checked={editCtrAngle}
            onIonChange={(e: any) => setEditCtrAngle(e.detail.checked)}
            disabled={!isConnected}
          />
        </IonItemDivider>
        <IonItem>
          <IonRange
            disabled={!editCtrAngle}
            debounce={250}
            pinFormatter={pinFormater}
            onIonChange={(e) => setAngleCtrNewValue(e, 0)}
            pin
            min={0}
            max={50}
            step={0.1}
            value={ctrAngle[0]}
          >
            <IonLabel slot='start'>Kc:</IonLabel>
            <IonNote slot='end'>{ctrAngle[0].toFixed(2)}</IonNote>
          </IonRange>
        </IonItem>
        <IonItem>
          <IonRange
            disabled={!editCtrAngle}
            debounce={250}
            pinFormatter={pinFormater}
            onIonChange={(e) => setAngleCtrNewValue(e, 1)}
            pin
            min={0}
            max={50}
            step={0.1}
            value={ctrAngle[1]}
          >
            <IonLabel slot='start'>Ki:</IonLabel>
            <IonNote slot='end'>{ctrAngle[1].toFixed(2)}</IonNote>
          </IonRange>
        </IonItem>
        <IonItem>
          <IonRange
            disabled={!editCtrAngle}
            debounce={150}
            pinFormatter={pinFormater}
            onIonChange={(e) => setAngleCtrNewValue(e, 2)}
            pin
            min={-5}
            max={10}
            step={0.05}
            value={ctrAngle[2]}
          >
            <IonLabel slot='start'>Kd:</IonLabel>
            <IonNote slot='end'>{ctrAngle[2].toFixed(2)}</IonNote>
          </IonRange>
        </IonItem>

        <IonItemDivider>
          <IonLabel>Velocity PID Controller</IonLabel>
          <IonToggle
            slot='end'
            checked={editCtrVel}
            disabled={!isConnected}
            onIonChange={(e: any) => setEditCtrVel(e.detail.checked)}
          />
        </IonItemDivider>

        <IonItem>
          <IonRange
            disabled={!editCtrVel}
            debounce={250}
            pinFormatter={pinFormater}
            onIonChange={(e) => setVelCtrNewValue(e, 0)}
            pin
            min={0}
            max={25}
            step={0.1}
            value={ctrVel[0]}
          >
            <IonLabel slot='start'>Kc:</IonLabel>
            <IonNote slot='end'>{ctrVel[0].toFixed(2)}</IonNote>
          </IonRange>
        </IonItem>
        <IonItem>
          <IonRange
            disabled={!editCtrVel}
            debounce={250}
            pinFormatter={pinFormater}
            onIonChange={(e) => setVelCtrNewValue(e, 1)}
            pin
            min={0}
            max={25}
            step={0.1}
            value={ctrVel[1]}
          >
            <IonLabel slot='start'>Ki:</IonLabel>
            <IonNote slot='end'>{ctrVel[1].toFixed(2)}</IonNote>
          </IonRange>
        </IonItem>
        <IonItem>
          <IonRange
            disabled={!editCtrVel}
            debounce={100}
            pinFormatter={pinFormater}
            onIonChange={(e) => setVelCtrNewValue(e, 2)}
            pin
            min={-5}
            max={5}
            step={0.005}
            value={ctrVel[2]}
          >
            <IonLabel slot='start'>Kd:</IonLabel>
            <IonNote slot='end'>{ctrVel[2].toFixed(3)}</IonNote>
          </IonRange>
        </IonItem>

        <IonItemDivider>
          <IonLabel>Rotation PID Controller</IonLabel>
          <IonToggle
            slot='end'
            checked={editCtrRot}
            disabled={!isConnected}
            onIonChange={(e: any) => setEditCtrRot(e.detail.checked)}
          />
        </IonItemDivider>

        <IonItem>
          <IonRange
            disabled={!editCtrRot}
            debounce={250}
            pinFormatter={pinFormater}
            onIonChange={(e) => setRotCtrNewValue(e, 0)}
            pin
            min={0}
            max={25}
            step={0.1}
            value={ctrRot[0]}
          >
            <IonLabel slot='start'>Kc:</IonLabel>
            <IonNote slot='end'>{ctrRot[0].toFixed(2)}</IonNote>
          </IonRange>
        </IonItem>
        <IonItem>
          <IonRange
            disabled={!editCtrRot}
            debounce={250}
            pinFormatter={pinFormater}
            onIonChange={(e) => setRotCtrNewValue(e, 1)}
            pin
            min={0}
            max={25}
            step={0.1}
            value={ctrRot[1]}
          >
            <IonLabel slot='start'>Ki:</IonLabel>
            <IonNote slot='end'>{ctrRot[1].toFixed(2)}</IonNote>
          </IonRange>
        </IonItem>
        <IonItem>
          <IonRange
            disabled={!editCtrRot}
            debounce={100}
            pinFormatter={pinFormater}
            onIonChange={(e) => setRotCtrNewValue(e, 2)}
            pin
            min={-5}
            max={5}
            step={0.005}
            value={ctrRot[2]}
          >
            <IonLabel slot='start'>Kd:</IonLabel>
            <IonNote slot='end'>{ctrRot[2].toFixed(3)}</IonNote>
          </IonRange>
        </IonItem>
      </IonList>
    </div>
  );
};

export default PIDParameters;
