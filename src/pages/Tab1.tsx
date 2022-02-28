import {
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRange,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Joystick from '../components/Joystick/Joystick';
import { delayMs, setRobotSetPointSpeeds } from '../services/arduino';
import { RootState } from '../store/reducers';
import './Tab1.scss';

const Tab1: React.FC = () => {
  const { isConnected } = useSelector((state: RootState) => state.bluetooth);
  const [editVel, setEditVel] = useState(false);
  const [maxVelY, setMaxVelY] = useState(0.4); // m/s
  const [maxVelX, setMaxVelX] = useState(3); // rad/s

  async function onSetVelToArduino(velX: number, velY: number) {
    if (!isConnected) return;
    try {
      await setRobotSetPointSpeeds(velY, velX);
    } catch (e) {}
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <section className='Tab1'>
          <IonList>
            <IonItemDivider>
              <IonLabel>Max. velocities values</IonLabel>
              <IonToggle
                slot='end'
                checked={editVel}
                onIonChange={(e: any) => setEditVel(e.detail.checked)}
              />
            </IonItemDivider>
            {editVel && (
              <>
                <IonItem>
                  <IonRange
                    disabled={!editVel}
                    debounce={100}
                    onIonChange={(e: any) => {
                      setMaxVelY(e.target.value);
                    }}
                    min={0}
                    max={1}
                    step={0.05}
                    value={maxVelY}
                  >
                    <IonLabel slot='start'>linear vel. [m/s]:</IonLabel>
                    <IonNote slot='end'>{maxVelY.toFixed(2)}</IonNote>
                  </IonRange>
                </IonItem>
                <IonItem>
                  <IonRange
                    disabled={!editVel}
                    debounce={100}
                    onIonChange={(e: any) => {
                      setMaxVelX(e.target.value);
                    }}
                    min={0}
                    max={4}
                    step={0.1}
                    value={maxVelX}
                  >
                    <IonLabel slot='start'>angular vel. [rad/s]:</IonLabel>
                    <IonNote slot='end'>{maxVelX.toFixed(2)}</IonNote>
                  </IonRange>
                </IonItem>
              </>
            )}
          </IonList>
          <div className='layout-joystick'>
            <Joystick maxVel={maxVelY} maxRot={maxVelX} getMovement={onSetVelToArduino} />
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
