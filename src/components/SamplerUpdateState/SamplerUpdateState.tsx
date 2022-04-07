/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { getRobotState, updateState } from '../../store/actions/robot.actions';
import { File } from '@awesome-cordova-plugins/file';
import { useIonToast } from '@ionic/react';

const SamplerUpdateState = () => {
  const dispatch = useDispatch();
  const startSampling = useSelector((state: RootState) => state.robot.startSampling);
  const sampleTime = useSelector((state: RootState) => state.robot.sampleTime);
  const isConnected = useSelector((state: RootState) => state.bluetooth.isConnected);
  const timeIntervalHandler = useRef<any | null>();
  const [toast] = useIonToast();
  let timerPointer = useRef<number>(0);

  useEffect(() => {
    createFolder();
  }, []);

  useEffect(() => {
    if (!startSampling || !isConnected) {
      clearInterval(timeIntervalHandler.current);
      timerPointer.current = 0;
      return;
    }
    timeIntervalHandler.current = setInterval(gettingDataState, sampleTime);
  }, [startSampling, isConnected]);

  async function createFolder() {
    try {
      await File.checkDir(File.dataDirectory, 'SBControllerData');
      toast('Directory is Ready', 2500);
    } catch (e) {
      toast('Creating the directory', 2500);
      try {
        await File.createDir(File.dataDirectory, 'SBControllerData', true);
        toast('Directory created', 2500);
      } catch (error: any) {
        toast(`Error creating directory:${error?.message}`, 2500);
      }

    }
  }




  async function gettingDataState() {
    timerPointer.current += (sampleTime as number) / 1000;
    dispatch(getRobotState());
    //////////////////////SIMULATION////////////////////////////
    // dispatch(
    //   updateState({
    //     incliAngle: 5 * Math.sin(2 * Math.PI * timerPointer.current),
    //     robotOrien: timerPointer.current % 360,
    //     posX: timerPointer.current / 10,
    //     posY: timerPointer.current / 10,
    //     linearVelocity: 0.5 * Math.sin(2 * Math.PI * timerPointer.current),
    //   })
    // );
  }

  return <></>;
};

export default memo(SamplerUpdateState);
