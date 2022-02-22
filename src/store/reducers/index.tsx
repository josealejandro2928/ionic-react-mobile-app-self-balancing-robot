import { combineReducers } from 'redux';

import bluetoothReducer, { BluetoothState } from './bluetooth.reducer';

export interface RootState {
  bluetooth: BluetoothState;
}

const rootReducer = combineReducers<RootState>({
  bluetooth: bluetoothReducer,
});

export default rootReducer;
