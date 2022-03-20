/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { getRobotState } from '../../store/actions/robot.actions';

const SamplerUpdateState = () => {
  const dispatch = useDispatch();
  const startSampling = useSelector((state: RootState) => state.robot.startSampling);
  const sampleTime = useSelector((state: RootState) => state.robot.sampleTime);
  const isConnected = useSelector((state: RootState) => state.bluetooth.isConnected);
  const timeIntervalHandler = useRef<any | null>();
  let timerPointer = useRef<number>(0);

  useEffect(() => {
    console.log('Hello From: SamplerUpdateState');
  }, []);

  useEffect(() => {
    if (!startSampling || !isConnected) {
      clearInterval(timeIntervalHandler.current);
      timerPointer.current = 0;
      return;
    }
    timeIntervalHandler.current = setInterval(gettingDataState, sampleTime);
  }, [startSampling, isConnected]);

  async function gettingDataState() {
    console.log('Aqui');
    timerPointer.current += (sampleTime as number) / 1000;
    dispatch(getRobotState());
    //////////////////////SIMULATION////////////////////////////
    // dispatch(
    //   updateState({
    //     incliAngle: 5 * Math.sin(2 * Math.PI * timerPointer.current),
    //     robotOrien: timerPointer.current % 360,
    //     posX: timerPointer.current / 10,
    //     posY: timerPointer.current / 10,
    //   })
    // );
  }

  return <></>;
};

export default memo(SamplerUpdateState);
