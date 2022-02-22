import { IonItem, IonLabel, IonList } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices } from '../store/actions/bluetooth.actions';
import { RootState } from '../store/reducers';

const BluetoothList: React.FC = () => {
  const dispatch = useDispatch();
  const { list: bluetoothDevices } = useSelector((state: RootState) => state.bluetooth);

  useEffect(() => {
    dispatch(getDevices());
  }, []);

  return (
    <React.Fragment>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <IonList style={{ marginTop: '16px' }}>
          {bluetoothDevices.map((device) => (
            <IonItem key={device.id}>
              <IonLabel>{device.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </div>
    </React.Fragment>
  );
};

export default BluetoothList;
