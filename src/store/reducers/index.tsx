import { combineReducers } from 'redux';

import bluetoothReducer, { BluetoothState } from './bluetooth.reducer';
import robotReducer, { IRobotState } from './robot.reducer';
export interface RootState {
  bluetooth: BluetoothState;
  robot: IRobotState;
}

const rootReducer = combineReducers<RootState>({
  bluetooth: bluetoothReducer,
  robot: robotReducer,
});

export default rootReducer;
