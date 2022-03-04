import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
  useIonToast,
} from '@ionic/react';
import { bluetooth } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useEffectUpdate from '../../hooks/useEffectUpdate';
import { delayMs } from '../../services/arduino';
import { RootState } from '../../store/reducers';
import BetteryLevel from '../BatteryLevel/BatteryLevel';
import BluetoothList from './../BluetoothList/BluetoothList';
import './Header.scss';

const Header: React.FC = () => {
  let locationHook = useLocation();
  let [tab, setTab] = useState('');
  let [isBluetoothModalOpen, setOpenBluetoothModal] = useState(false);
  const { error: bluetoothError } = useSelector((state: RootState) => state.bluetooth);
  const [present] = useIonToast();

  useEffect(() => {
    setTab(locationHook.pathname);
  }, [locationHook, locationHook.pathname]);

  useEffectUpdate(async () => {
    if (bluetoothError) {
      present(`Error in bluetooth: ${bluetoothError}`, 2500);
      await delayMs(3000);
      window.location.assign('/');
      await delayMs(1000);
      window.location.reload();
    }
  }, [bluetoothError]);

  function openModalBluetooth() {
    setOpenBluetoothModal(true);
  }

  return (
    <div className='Header'>
      <IonHeader>
        <IonToolbar>
          {tab === '/tab1' && <IonTitle>Driver</IonTitle>}
          {tab === '/tab2' && <IonTitle>Adjust Controllers</IonTitle>}
          {tab === '/tab3' && <IonTitle>Metrics</IonTitle>}
          {tab === '/tab4' && <IonTitle>Autonomus</IonTitle>}

          <IonButton
            onClick={openModalBluetooth}
            style={{ margingRight: '16px !important' }}
            slot='end'
            fill='clear'
          >
            <IonIcon style={{ color: '#fff', fontSize: '24px' }} icon={bluetooth} />
          </IonButton>
          <BetteryLevel slot='end'></BetteryLevel>
        </IonToolbar>
      </IonHeader>

      <IonModal
        isOpen={isBluetoothModalOpen}
        onDidDismiss={() => {
          setOpenBluetoothModal(false);
        }}
      >
        <IonContent>
          <IonToolbar>
            <h4 className='ion-padding-start'>Bluetooth Devices</h4>

            <IonButton
              onClick={() => setOpenBluetoothModal(false)}
              style={{ margingRight: '16px !important' }}
              slot='end'
              fill='clear'
            >
              Close
            </IonButton>
          </IonToolbar>
          <BluetoothList />
        </IonContent>
      </IonModal>
    </div>
  );
};

export default Header;
