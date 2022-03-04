/* eslint-disable react-hooks/exhaustive-deps */
import { IonPage, IonContent, IonHeader, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Canvas2DRobot from '../components/Canvas2DRobot/Canvas2DRobot';
import { updateState } from '../store/actions/robot.actions';
import ShowState from '../components/ShowState/ShowState';
import './Autonomus.scss';

const Autonomus = () => {
  const [startPath, setStartPath] = useState(false);
  const [setPoint, setSetPoint] = useState([0, 0]);
  const dispatch = useDispatch();

  const timerHandlerRef = useRef<any>();

  function inStartPointTraker(x: any, y: any) {
    setStartPath(true);
    setSetPoint([x, -1 * y]);
  }

  useEffect(() => {
    if (!startPath) {
      clearInterval(timerHandlerRef.current);
      return;
    }

    let counterX = 0;
    let counterY = 0;
    timerHandlerRef.current = setInterval(() => {
      counterX -= 0.05;
      counterY -= 0.01;
      let orientation = Math.random() * 360;
      dispatch(updateState({ posX: counterX, posY: counterY, robotOrien: orientation }));
    }, 150);

    return () => {
      clearInterval(timerHandlerRef.current);
    };
  }, [startPath]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <Canvas2DRobot start={startPath} goToPoint={inStartPointTraker} setPoint={setPoint} />
        <ShowState variables={['position']} />
      </IonContent>
    </IonPage>
  );
};

export default Autonomus;
