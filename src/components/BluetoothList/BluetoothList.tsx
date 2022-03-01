/* eslint-disable react-hooks/exhaustive-deps */
import { IonButton, IonCheckbox, IonItem, IonLabel, IonList, useIonToast } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDevices,
  setDeviceConnected,
  errorDeviceConnection,
} from '../../store/actions/bluetooth.actions';
import { RootState } from '../../store/reducers';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';
import { IBluetooth } from '../../store/reducers/bluetooth.reducer';
import './BluetoothList.scss';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog';
import { Subscription } from 'rxjs';

const BluetoothList: React.FC = () => {
  const dispatch = useDispatch();
  const [present] = useIonToast();
  const { list: bluetoothDevices } = useSelector((state: RootState) => state.bluetooth);
  const { bluetoothConnected, isConnected } = useSelector((state: RootState) => state.bluetooth);
  const [selectedBluetooth, setSelectDevice] = useState<IBluetooth | null | undefined>(null);
  const bluetoothSubs = useRef<Subscription | null>();

  useEffect(() => {
    (async () => {
      dispatch(getDevices());
      await checkBluetoothEnabled();
      if (isConnected) {
        setSelectDevice(bluetoothConnected);
      }
    })();
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
      bluetoothSubs.current = BluetoothSerial.connect(
        selectedBluetooth?.address as string
      ).subscribe({
        next: () => {
          dispatch(setDeviceConnected(selectedBluetooth));
          present('Device connected successfully', 2000);
          SpinnerDialog.hide();
        },
        error: (e: Error) => {
          present(
            `Error: ${e.message || 'Device is not connected'}\n You must to connect it again!`,
            3000
          );
          dispatch(errorDeviceConnection(e.message || 'Lost connection'));
          SpinnerDialog.hide();
          bluetoothSubs.current?.unsubscribe();
        },
      });
    } catch (e) {
      console.log(e);
      present('Error: Device is not connected', 2000);
    }
  }

  async function onDisconnect() {
    try {
      await BluetoothSerial.disconnect();
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
                  disabled={isConnected === true}
                  slot='end'
                  color='primary'
                />
              </IonItem>
            ))}
          </IonList>
          <IonButton
            disabled={!selectedBluetooth || isConnected === true}
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

          {/* {isConnected && (
            <div className='state-layout'>
              <ShowState multipleSamplint></ShowState>
            </div>
          )} */}
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
