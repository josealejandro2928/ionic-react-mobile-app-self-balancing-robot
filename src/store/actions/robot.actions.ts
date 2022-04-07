import {
  SET_ROBOT_DYNAMIC_STATE,
  RESET_ROBOT_DYNAMIC_STATE,
  PERSIST_ROBOT_DYNAMIC_STATE,
} from '../reducers/robot.reducer';
import { ERROR_BLUETOOTH } from '../reducers/bluetooth.reducer';

import { getRobotStateArduino } from '../../services/arduino';

export const getRobotState = () => async (dispatch: Function) => {
  try {
    let data = await getRobotStateArduino();
    dispatch({
      type: SET_ROBOT_DYNAMIC_STATE,
      payload: data,
    });
  } catch (err) {
    const error: any = err;
    dispatch({
      type: ERROR_BLUETOOTH,
      payload: error?.message,
    });
  }
};

export const updateState =
  (stateUpdate: {
    linearVelocity?: number;
    angularVelocity?: number;
    incliAngle?: number;
    posX?: number;
    posY?: number;
    robotOrien?: number;
    battery?: number;
    startSampling?: boolean;
    sampleTime?: number;
    persistData?: boolean;
    records?: Array<any>;
  }) =>
  async (dispatch: Function) => {
    return dispatch({
      type: SET_ROBOT_DYNAMIC_STATE,
      payload: stateUpdate,
    });
  };

export const resetState = () => async (dispatch: Function) => {
  return dispatch({
    type: RESET_ROBOT_DYNAMIC_STATE,
    payload: null,
  });
};

export const persistState = (persistState: boolean) => async (dispatch: Function) => {
  return dispatch({
    type: PERSIST_ROBOT_DYNAMIC_STATE,
    payload: persistState,
  });
};
