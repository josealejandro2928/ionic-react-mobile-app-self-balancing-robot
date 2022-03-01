import { SET_ROBOT_DYNAMIC_STATE } from '../reducers/robot.reducer';
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
  }) =>
  async (dispatch: Function) => {
    dispatch({
      type: SET_ROBOT_DYNAMIC_STATE,
      payload: stateUpdate,
    });
  };
