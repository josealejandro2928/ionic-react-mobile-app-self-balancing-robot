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
import useEffectUpdate from '../hooks/useEffectUpdate';
import { RootState } from '../store/reducers';
import BluetoothList from './BluetoothList';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  let location = useLocation();
  let [tab, setTab] = useState('');
  let [isBluetoothModalOpen, setOpenBluetoothModal] = useState(false);
  const { error: bluetoothError } = useSelector((state: RootState) => state.bluetooth);
  const [present] = useIonToast();

  useEffect(() => {
    setTab(location.pathname);
  }, [location, location.pathname]);

  useEffectUpdate(() => {
    present(`Error in bluetooth: ${bluetoothError}`, 2500);
  }, [bluetoothError]);

  function openModalBluetooth() {
    setOpenBluetoothModal(true);
  }

  return (
    <React.Fragment>
      <IonHeader>
        <IonToolbar>
          {tab === '/tab1' && <IonTitle>Home</IonTitle>}
          {tab === '/tab2' && <IonTitle>Adjust Controllers</IonTitle>}
          {tab === '/tab3' && <IonTitle>Tab3</IonTitle>}

          <IonButton
            onClick={openModalBluetooth}
            style={{ margingRight: '16px !important' }}
            slot='end'
            fill='clear'
          >
            <IonIcon style={{ color: '#fff', fontSize: '24px' }} icon={bluetooth} />
          </IonButton>
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
    </React.Fragment>
  );
};

export default Header;
