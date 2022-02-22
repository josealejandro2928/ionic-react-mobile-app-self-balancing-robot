import { SET_ROBOT_DYNAMIC_STATE } from '../reducers/robot.reducer';
import { ERROR_BLUETOOTH } from '../reducers/bluetooth.reducer';

import { arduinoGetRobotState } from '../../service/arduino';

export const getRobotState = () => async (dispatch: Function) => {
  try {
    let data = await arduinoGetRobotState();
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
