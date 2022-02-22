import {
  SET_LIST_DEVICES_BLUETOOTH,
  ERROR_BLUETOOTH,
  IBluetooth,
  LOADING_BLUETOOTH,
} from '../reducers/bluetooth.reducer';

const getBluetoothDevices = (): Promise<Array<IBluetooth>> => {
  let bluetooth: Array<IBluetooth> = [
    { name: 'device # 1', id: '45', ip: '15465as4d5asd' },
    { name: 'device # 2', id: '5', ip: 'asdasd8798' },
  ];
  return new Promise((resolve) => {
    resolve(bluetooth);
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

