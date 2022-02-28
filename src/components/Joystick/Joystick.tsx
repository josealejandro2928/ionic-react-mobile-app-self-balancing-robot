import React, { useEffect, useRef } from 'react';
import JoyStick from '../../services/joy';
import { Vibration } from '@awesome-cordova-plugins/vibration';

const Joystick = ({
  maxVel = 0.45,
  maxRot = 3,
  sampling = 50,
  getMovement = (x: number, y: number) => {},
  style = {},
}: {
  maxVel?: number;
  maxRot?: number;
  sampling?: number;
  style?: React.CSSProperties;
  getMovement?: Function;
}) => {
  const joyRef = useRef<any>();
  const vector = useRef<Array<number>>([0, 0]);
  const Max_OUTPUT_JOYSTICK = 85;

  useEffect(() => {
    if (joyRef.current) return;
    joyRef.current = new JoyStick('joyDiv', {
      width: 217,
      height: 217,
      internalFillColor: '#3880ff',
      externalStrokeColor: '#3880ff',
      externalLineWidth: 3,
      internalStrokeColor: '#3880ff',
    });
  }, []);

  useEffect(() => {
    let time: any = null;
    if (!joyRef.current) return;

    if (time) clearInterval(time);

    time = setInterval(samplingData, sampling);

    return () => {
      clearInterval(time);
    };
  }, [joyRef.current, maxVel, maxRot]);

  function samplingData() {
    const [x, y] = joyRef?.current.GetMotion();
    let shouldUpdate = false;
    if (x !== vector.current[0]) {
      shouldUpdate = true;
    }
    if (y !== vector.current[1]) {
      shouldUpdate = true;
    }
    vector.current = [x, y];
    if (!shouldUpdate) return;
    let velY = maxVel * Math.min(y / Max_OUTPUT_JOYSTICK, 1);
    let velX = -1 * maxRot * Math.min(x / Max_OUTPUT_JOYSTICK, 1);
    getMovement(velX, velY);
  }

  return (
    <React.Fragment>
      <div style={style} id='joyDiv'></div>
    </React.Fragment>
  );
};

export default Joystick;
