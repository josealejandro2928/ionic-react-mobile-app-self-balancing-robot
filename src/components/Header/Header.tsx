/* eslint-disable react-hooks/exhaustive-deps */
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
  useIonToast,
  isPlatform,
  useIonActionSheet,
  ActionSheetButton,
} from '@ionic/react';
import { bluetooth, saveOutline, stopwatchOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useEffectUpdate from '../../hooks/useEffectUpdate';
import { delayMs } from '../../services/arduino';
import { persistState, resetState, updateState } from '../../store/actions/robot.actions';
import { RootState } from '../../store/reducers';
import BetteryLevel from '../BatteryLevel/BatteryLevel';
import BluetoothList from './../BluetoothList/BluetoothList';
import { File } from '@awesome-cordova-plugins/file';

import './Header.scss';

const Header: React.FC = () => {
  let locationHook = useLocation();
  let [tab, setTab] = useState('');
  let [isBluetoothModalOpen, setOpenBluetoothModal] = useState(false);
  const { error: bluetoothError, isConnected } = useSelector((state: RootState) => state.bluetooth);
  const persistData = useSelector((state: RootState) => state.robot.persistData);
  const records = useSelector((state: RootState) => state.robot.records);
  const dispatch = useDispatch();
  const [toast] = useIonToast();
  const [actionSheet] = useIonActionSheet();
  // const mount = useRef<boolean>(false);


  useEffect(() => {
    setTab(locationHook.pathname);
  }, [locationHook, locationHook.pathname]);

  useEffectUpdate(async () => {
    if (bluetoothError) {
      toast(`Error in bluetooth: ${bluetoothError}`, 2500);
      dispatch(resetState());
      await delayMs(1000);
      window.location.reload();
    }
  }, [bluetoothError]);


  function openModalBluetooth() {
    setOpenBluetoothModal(true);
  }

  async function onStartRecord() {
    try {
      const onSelection = async (data: any) => {
        await dispatch(persistState(true));
        dispatch(updateState({
          sampleTime: data,
          startSampling: true,
          records: []
        }));
      }
      const buttons: ActionSheetButton<any>[] = [{ text: '100 ms', 'icon': stopwatchOutline, handler: () => (onSelection(100)) },
      { text: '150 ms', 'icon': stopwatchOutline, handler: () => (onSelection(150)) }]
      await actionSheet(buttons, "Select the sampling time for storage the data")

    } catch (e: any) {
      toast(`Error ${e.message}`, 3000);
    }
  }

  useEffect(() => {
    if (records?.length && records?.length >= 250) {
      onStopRecords();
    }
  }, [records]);

  async function onStopRecords() {
    try {
      let data = JSON.stringify(records);
      await dispatch(persistState(false));
      await dispatch(updateState({
        startSampling: false,
        persistData: false,
        records: []
      }));
      await File.writeFile(File.externalDataDirectory + '/SBControllerData', 'data.json',
        data, { replace: true });
      toast("Data saved succefully !!!", 2000);
    } catch (e: any) {
      toast(`Error wiriting in File System: ${e.message}`, 3000);
    }
  }


  return (
    <div className='Header'>
      <IonHeader>
        <IonToolbar>
          {tab === '/tab1' && <IonTitle>Driver</IonTitle>}
          {tab === '/tab2' && <IonTitle>Adjust Controllers</IonTitle>}
          {tab === '/tab3' && <IonTitle>Metrics</IonTitle>}
          {tab === '/tab4' && <IonTitle>Automatic</IonTitle>}


          {isConnected && !persistData &&
            < IonIcon onClick={onStartRecord} slot={isPlatform('ios') ? 'start' : 'end'}
              style={{ color: '#fff', fontSize: '20px', margin: '8px' }} icon={saveOutline} />}

          {isConnected && persistData &&
            <IonButton onClick={onStopRecords} color='danger' slot='end'>
              stop
            </IonButton>
          }


          {!persistData && <IonIcon onClick={openModalBluetooth}
            slot='end' style={{ color: '#fff', fontSize: '20px', margin: '8px' }} icon={bluetooth} />
          }

          <BetteryLevel slot='end'></BetteryLevel>
        </IonToolbar>
      </IonHeader>
      {isPlatform('ios') && <br />}

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
    </div >
  );
};

export default Header;
