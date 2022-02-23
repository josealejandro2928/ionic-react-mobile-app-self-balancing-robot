import {
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonRange,
  IonToggle,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRobotState } from '../store/actions/robot.actions';
import { RootState } from '../store/reducers';
import './PIDParameters.scss';

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

  const [editCtrAngle, setEditCtrAngle] = useState(false);
  const [editCtrVel, setEditCtrVel] = useState(false);
  const [editCtrRot, setEditCtrRot] = useState(false);

  function pinFormater(value: number) {
    return value.toFixed(1);
  }

  function setAngleCtrNewValue(data: any, index: number) {
    let newValue = [...ctrAngle];
    newValue[index] = data.target.value;
    setCtrAngle([...newValue]);
  }

  function setVelCtrNewValue(data: any, index: number) {
    let newValue = [...ctrVel];
    newValue[index] = data.target.value;
    setCtrVel([...newValue]);
  }

  function setRotCtrNewValue(data: any, index: number) {
    let newValue = [...ctrRot];
    newValue[index] = data.target.value;
    setCtrRot([...newValue]);
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
