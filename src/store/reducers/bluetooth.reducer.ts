////////////////////////// INTERFACES ////////////////////////
export interface IBluetooth {
  class?: number;
  id: string;
  address: string;
  name: string;
}

export interface BluetoothState {
  list: Array<IBluetooth>;
  bluetoothConnected: IBluetooth | null | undefined;
  isConnected: boolean | null;
  loading: boolean;
  error: any;
}
/////////////////////////////////////////////////////////////////

////////////////////////TYPES////////////////////////////////

export const SET_LIST_DEVICES_BLUETOOTH = 'SET_LIST_DEVICES_BLUETOOTH';
export const GET_LIST_DEVICES_BLUETOOTH = 'GET_LIST_DEVICES_BLUETOOTH';
export const SET_DEVICE_CONNECTED_BLUETOOTH = 'SET_DEVICE_CONNECTED_BLUETOOTH';
export const SET_DEVICE_DISCONNECTED_BLUETOOTH = 'SET_DEVICE_DISCONNECTED_BLUETOOTH';

export const LOADING_BLUETOOTH = 'LOADING_BLUETOOTH';
export const ERROR_BLUETOOTH = 'ERROR_BLUETOOTH';

///////////////////////////////////////////////////////////

const initialState: BluetoothState = {
  list: [],
  bluetoothConnected: null,
  isConnected: false,
  loading: false,
  error: null,
};

const bluetoothReducer = (
  state: BluetoothState = initialState,
  action: { type: string; payload?: any }
): BluetoothState => {
  const { type, payload } = action;

  switch (type) {
    case SET_LIST_DEVICES_BLUETOOTH:
      return { ...state, list: payload, loading: false };
    case SET_DEVICE_CONNECTED_BLUETOOTH:
      const result: IBluetooth = payload as IBluetooth;
      return { ...state, bluetoothConnected: result, isConnected: true };
    case SET_DEVICE_DISCONNECTED_BLUETOOTH:
      return { ...state, bluetoothConnected: null, isConnected: false };
    case LOADING_BLUETOOTH:
      return { ...state, loading: payload };
    case ERROR_BLUETOOTH:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default bluetoothReducer;
