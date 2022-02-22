import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
  IonLabel,
} from '@ionic/react';
import { bluetooth } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import BluetoothList from './BluetoothList';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  let location = useLocation();
  let [tab, setTab] = useState('');
  let [isBluetoothModalOpen, setOpenBluetoothModal] = useState(false);

  useEffect(() => {
    setTab(location.pathname);
  }, [location, location.pathname]);

  function openModalBluetooth() {
    setOpenBluetoothModal(true);
  }

  return (
    <React.Fragment>
      <IonHeader>
        <IonToolbar>
          {tab === '/tab1' && <IonTitle>Home</IonTitle>}
          {tab === '/tab2' && <IonTitle>Parameters</IonTitle>}
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

      <IonModal isOpen={isBluetoothModalOpen}>
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
