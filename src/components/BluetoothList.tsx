import { IonButton, IonCheckbox, IonItem, IonLabel, IonList, useIonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices, setDeviceConnected } from '../store/actions/bluetooth.actions';
import { RootState } from '../store/reducers';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';
import { IBluetooth } from '../store/reducers/bluetooth.reducer';
import './BluetoothList.scss';
import { lastValueFrom } from 'rxjs';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog';

const BluetoothList: React.FC = () => {
  const dispatch = useDispatch();
  const [present] = useIonToast();
  const { list: bluetoothDevices } = useSelector((state: RootState) => state.bluetooth);
  const { bluetoothConnected } = useSelector((state: RootState) => state.bluetooth);
  const [selectedBluetooth, setSelectDevice] = useState<IBluetooth | null | undefined>(null);

  useEffect(() => {
    dispatch(getDevices());
    checkBluetoothEnabled();
  }, []);

  async function checkBluetoothEnabled() {
    try {
      await BluetoothSerial.isEnabled();
    } catch (e) {
      await present('Please enable your  Bluetooth', 3000);
    }
  }

  function onChangeDevice(device: IBluetooth) {
    if (selectedBluetooth?.address === device?.address) {
      setSelectDevice(null);
    } else {
      setSelectDevice(device);
    }
  }

  async function onConnect() {
    try {
      SpinnerDialog.show(`${selectedBluetooth?.name} is connecting...`);
      // await lastValueFrom(BluetoothSerial.connect(selectedBluetooth?.address as string));
      present('Device connected successfully', 2000);
      await dispatch(setDeviceConnected(selectedBluetooth));
      SpinnerDialog.hide();
    } catch (e) {
      present('Error: Device is not connected', 2000);
    }
  }

  async function onDisconnect() {
    try {
      // await BluetoothSerial.disconnect();
      present('Device disconnected', 2000);
      setSelectDevice(null);
      await dispatch(setDeviceConnected(null));
    } catch (e) {
      present('Upps, Error: Device is not disconnected', 2000);
    }
  }

  return (
    <div className='BluetoothList'>
      {bluetoothDevices && bluetoothDevices?.length > 0 && (
        <React.Fragment>
          <IonList>
            {bluetoothDevices.map((device) => (
              <IonItem key={device.id} onClick={() => onChangeDevice(device)}>
                <IonLabel
                  color={bluetoothConnected?.address === device.address ? 'primary' : '#fff'}
                >
                  {device.name}
                </IonLabel>
                <IonLabel
                  color={bluetoothConnected?.address === device.address ? 'primary' : '#fff'}
                  style={{ fontStyle: 'italic', fontSize: '.92rem', opacity: 0.8 }}
                >
                  {device.address}
                </IonLabel>
                <IonCheckbox
                  checked={selectedBluetooth?.address === device.address}
                  slot='end'
                  color='primary'
                />
              </IonItem>
            ))}
          </IonList>
          <IonButton
            disabled={!selectedBluetooth}
            style={{ marginTop: 8 }}
            expand='block'
            fill='outline'
            onClick={onConnect}
          >
            Connect
          </IonButton>

          <IonButton
            onClick={onDisconnect}
            disabled={!bluetoothConnected}
            style={{ marginTop: 16 }}
            expand='block'
          >
            Disconnect
          </IonButton>
        </React.Fragment>
      )}
      {!bluetoothDevices ||
        (!bluetoothDevices?.length && (
          <div className='no-devices'>
            <p>You don't have any device paired</p>
          </div>
        ))}
    </div>
  );
};

export default BluetoothList;
