import {
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonRange,
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

  const [ctrAngle, setCtrAngle] = useState<Array<number>>([iKc, iKi, iKd]);

  return (
    <div className='PIDParameters'>
      <IonList>
        <IonItemDivider>
          <IonLabel>Inclination PID Controller</IonLabel>
        </IonItemDivider>
        <IonItem>
          <IonRange
            debounce={350}
            onIonChange={(data: any) => {
              let newValue = [...ctrAngle];
              newValue[0] = data.target.value;
              setCtrAngle([...newValue]);
            }}
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
          <IonRange pin min={0} max={50} step={1000} value={20}>
            <IonLabel slot='start'>Ki:</IonLabel>
            <IonNote slot='end'>99</IonNote>
          </IonRange>
        </IonItem>
        <IonItem>
          <IonRange pin min={-10} max={10} step={100} value={0.5}>
            <IonLabel slot='start'>Kd:</IonLabel>
            <IonNote slot='end'>99</IonNote>
          </IonRange>
        </IonItem>

        <IonItemDivider>
          <IonLabel>Velocity PID Controller</IonLabel>
        </IonItemDivider>

        <IonItem>
          <IonRange pin min={0} max={50} step={1000} value={20}>
            <IonLabel slot='start'>Kc:</IonLabel>
            <IonNote slot='end'>99</IonNote>
          </IonRange>
        </IonItem>
        <IonItem>
          <IonRange pin min={0} max={50} step={1000} value={20}>
            <IonLabel slot='start'>Ki:</IonLabel>
            <IonNote slot='end'>99</IonNote>
          </IonRange>
        </IonItem>
        <IonItem>
          <IonRange pin min={-10} max={10} step={100} value={0.5}>
            <IonLabel slot='start'>Kd:</IonLabel>
            <IonNote slot='end'>99</IonNote>
          </IonRange>
        </IonItem>
      </IonList>
    </div>
  );
};

export default PIDParameters;
