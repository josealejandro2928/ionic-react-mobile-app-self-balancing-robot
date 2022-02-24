import {
  SET_DEVICE_CONNECTED_BLUETOOTH,
  SET_DEVICE_DISCONNECTED_BLUETOOTH,
  ERROR_BLUETOOTH,
  SET_LIST_DEVICES_BLUETOOTH,
  IBluetooth,
} from '../reducers/bluetooth.reducer';

import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';

const getBluetoothDevices = async (): Promise<Array<IBluetooth>> => {
  let devices: Array<IBluetooth> = await BluetoothSerial.list();
  // let devices: Array<IBluetooth> = [
  //   { name: 'SelfBalanced', id: '56', address: '4e:56:89:y' },
  //   { name: 'Iphone64', id: '76', address: '4e:56:89:z6' },
  // ];
  return new Promise((resolve) => {
    resolve(devices);
  });
};

export const getDevices = () => async (dispatch: Function) => {
  try {
    let data = await getBluetoothDevices();
    dispatch({
      type: SET_LIST_DEVICES_BLUETOOTH,
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
export const setDeviceConnected =
  (data: IBluetooth | null | undefined) => async (dispatch: Function) => {
    if (data) {
      dispatch({
        type: SET_DEVICE_CONNECTED_BLUETOOTH,
        payload: data,
      });
    } else {
      dispatch({
        type: SET_DEVICE_DISCONNECTED_BLUETOOTH,
      });
    }
  };

export const errorDeviceConnection = (msg: string) => async (dispatch: Function) => {
  dispatch({
    type: ERROR_BLUETOOTH,
    payload: null,
  });
};
