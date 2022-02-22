////////////////////////// INTERFACES ////////////////////////
export interface IBluetooth {
  name: string;
  description?: string;
  id: string;
  ip: string;
}

export interface BluetoothState {
  list: Array<IBluetooth>;
  bluetoothInterface: IBluetooth | null | undefined;
  isConnected: boolean | null;
  loading: boolean;
  error: any;
}
/////////////////////////////////////////////////////////////////

////////////////////////TYPES////////////////////////////////

export const SET_LIST_DEVICES_BLUETOOTH = 'SET_LIST_DEVICES_BLUETOOTH';
export const GET_LIST_DEVICES_BLUETOOTH = 'GET_LIST_DEVICES_BLUETOOTH';

export const LOADING_BLUETOOTH = 'LOADING_BLUETOOTH';
export const ERROR_BLUETOOTH = 'ERROR_BLUETOOTH';

///////////////////////////////////////////////////////////

const initialState: BluetoothState = {
  list: [],
  bluetoothInterface: null,
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
    case LOADING_BLUETOOTH:
      return { ...state, loading: payload };
    case ERROR_BLUETOOTH:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default bluetoothReducer;
