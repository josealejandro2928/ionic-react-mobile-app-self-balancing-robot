import { IonItem, IonLabel, IonList, IonListHeader, IonNote } from '@ionic/react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRobotState } from '../store/actions/robot.actions';
import { RootState } from '../store/reducers';
import './ShowState.scss';

const ShowState = ({ multipleSamplint = false }: { multipleSamplint?: boolean }) => {
  const SAMPLE_TIME = 100;
  const robotState = useSelector((state: RootState) => state.robot);
  const timerRef = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (multipleSamplint) {
      timerRef.current = setInterval(getState, SAMPLE_TIME);
    } else {
      timerRef.current = setTimeout(getState, SAMPLE_TIME);
    }
    return () => {
      if (!timerRef?.current) return;
      if (multipleSamplint) {
        clearInterval(timerRef.current as any);
      } else {
        clearTimeout(timerRef.current as any);
      }
    };
  }, []);

  function getState() {
    dispatch(getRobotState());
  }

  return (
    <div className='ShowState'>
      <IonList>
        <IonListHeader> Robot Measurements </IonListHeader>
        <IonItem>
          <IonLabel>position x[m]:</IonLabel>
          <IonNote slot='end'>{robotState.posX}</IonNote>
        </IonItem>

        <IonItem>
          <IonLabel>position y[m]:</IonLabel>
          <IonNote slot='end'>{robotState.posY}</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>incl. angle[deg]:</IonLabel>
          <IonNote slot='end'>{robotState.incliAngle}</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>linear vel[m/s]:</IonLabel>
          <IonNote slot='end'>{robotState.linearVelocity}</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>angular vel_Z[rad/s]:</IonLabel>
          <IonNote slot='end'>{robotState.angularVelocity}</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>robot Orient.[rad/s]:</IonLabel>
          <IonNote slot='end'>{robotState.robotOrien}</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>battery [%]:</IonLabel>
          <IonNote slot='end'>{robotState.battery}</IonNote>
        </IonItem>
      </IonList>
    </div>
  );
};

export default ShowState;
