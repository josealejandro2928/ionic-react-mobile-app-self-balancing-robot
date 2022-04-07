/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import JoyStick from '../../services/joy';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

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
  const Max_OUTPUT_JOYSTICK = 100;
  const { isConnected } = useSelector((state: RootState) => state.bluetooth);
  const timeIntervalHandler = useRef<any | null>();

  useEffect(() => {
    if (joyRef.current) return;
    joyRef.current = new JoyStick('joyDiv', {
      width: 200,
      height: 200,
      internalFillColor: '#3880ff',
      externalStrokeColor: '#3880ff',
      externalLineWidth: 3,
      internalStrokeColor: '#3880ff',
    });
  }, []);

  useEffect(() => {
    if (!joyRef.current) return;

    clearInterval(timeIntervalHandler?.current);

    timeIntervalHandler.current = setInterval(samplingData, sampling);

    return () => {
      clearInterval(timeIntervalHandler?.current);
    };
  }, [joyRef.current, maxVel, maxRot, isConnected]);

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
