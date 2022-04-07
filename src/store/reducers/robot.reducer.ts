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
  sampleTime?: number;
  persistData?: boolean;
  records?: Array<{
    linearVelocity: number;
    angularVelocity: number;
    incliAngle: number;
    posX: number;
    posY: number;
    robotOrien: number;
    battery: number;
  }>;
}
/////////////////////////////////////////////////////////////////

////////////////////////TYPES////////////////////////////////

export const SET_ROBOT_DYNAMIC_STATE = 'SET_ROBOT_DYNAMIC_STATE';
export const RESET_ROBOT_DYNAMIC_STATE = 'RESET_ROBOT_DYNAMIC_STATE';
export const PERSIST_ROBOT_DYNAMIC_STATE = 'PERSIST_ROBOT_DYNAMIC_STATE';

///////////////////////////////////////////////////////////

const initialState: IRobotState = {
  linearVelocity: 0.0,
  angularVelocity: 0.0,
  incliAngle: 0.0,
  posX: 0,
  posY: 0,
  robotOrien: 0.0,
  battery: 50,
  startSampling: false,
  sampleTime: 150,
  persistData: false,
  records: [],
};

const robotReducer = (
  state: IRobotState = initialState,
  action: { type: string; payload?: any }
): IRobotState => {
  const { type, payload } = action;

  switch (type) {
    case SET_ROBOT_DYNAMIC_STATE:
      if (state.persistData) {
        const newState: IRobotState = { ...state, ...payload };
        newState.records = newState.records || [];
        newState.records = [
          ...(newState.records as any),
          {
            linearVelocity: newState.linearVelocity,
            angularVelocity: newState.angularVelocity,
            incliAngle: newState.incliAngle,
            posX: newState.posX,
            posY: newState.posY,
            robotOrien: newState.robotOrien,
            battery: newState.battery,
          },
        ];
        return newState;
      }
      return { ...state, ...payload };

    case PERSIST_ROBOT_DYNAMIC_STATE:
      return { ...state, persistData: payload };

    case RESET_ROBOT_DYNAMIC_STATE:
      return { ...state, ...initialState };

    default:
      return state;
  }
};

export default robotReducer;
