////////////////////////// INTERFACES ////////////////////////
export interface IRobotState {
  linearVelocity: number;
  angularVelocity: number;
  incliAngle: number;
  posX: number;
  posY: number;
  robotOrien: number;
  battery?: number;
  startSampling?: boolean;
}
/////////////////////////////////////////////////////////////////

////////////////////////TYPES////////////////////////////////

export const SET_ROBOT_DYNAMIC_STATE = 'SET_ROBOT_DYNAMIC_STATE';

///////////////////////////////////////////////////////////

const initialState: IRobotState = {
  linearVelocity: 0.0,
  angularVelocity: 0.0,
  incliAngle: 0.0,
  posX: 0.0,
  posY: 0.0,
  robotOrien: 0.0,
  battery: 90.0,
  startSampling: false,
};

const robotReducer = (
  state: IRobotState = initialState,
  action: { type: string; payload?: any }
): IRobotState => {
  const { type, payload } = action;

  switch (type) {
    case SET_ROBOT_DYNAMIC_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default robotReducer;
