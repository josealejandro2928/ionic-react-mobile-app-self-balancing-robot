import { IonItem, IonLabel, IonList, IonListHeader, IonNote } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import './ShowState.scss';

const ShowState = ({ variables = [] }: { variables: Array<string> }) => {
  const robotState = useSelector((state: RootState) => state.robot);
  const [parameters, setParameters] = useState<any>({});

  useEffect(() => {
    const data = variables.reduce((ac: any, curr) => {
      ac[curr] = true;
      return ac;
    }, {});
    setParameters(data);
  }, [variables]);

  return (
    <div className='ShowState'>
      <IonList>
        <IonListHeader> Robot Measurements </IonListHeader>

        {parameters?.incliAngle && (
          <IonItem>
            <IonLabel>incl. angle[deg]:</IonLabel>
            <IonNote slot='end'>{(robotState.incliAngle || 0.0).toFixed(2)}</IonNote>
          </IonItem>
        )}

        {parameters?.linearVelocity && (
          <IonItem>
            <IonLabel>linear vel[m/s]:</IonLabel>
            <IonNote slot='end'>{(robotState.linearVelocity || 0.0).toFixed(2)}</IonNote>
          </IonItem>
        )}

        {parameters?.position && (
          <>
            <IonItem>
              <IonLabel>position x[m]:</IonLabel>
              <IonNote slot='end'>{(robotState.posX || 0.0).toFixed(2)}</IonNote>
            </IonItem>

            <IonItem>
              <IonLabel>position y[m]:</IonLabel>
              <IonNote slot='end'>{(robotState.posY || 0.0).toFixed(2)}</IonNote>
            </IonItem>
            <IonItem>
              <IonLabel>robot Orient.[rad/s]:</IonLabel>
              <IonNote slot='end'>{(robotState.robotOrien || 0.0).toFixed(2)}</IonNote>
            </IonItem>
          </>
        )}
        {parameters?.angularVelocity && (
          <IonItem>
            <IonLabel>angular vel_Z[rad/s]:</IonLabel>
            <IonNote slot='end'>{(robotState.angularVelocity || 0.0).toFixed(2)}</IonNote>
          </IonItem>
        )}
      </IonList>
    </div>
  );
};

export default ShowState;
