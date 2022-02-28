import './Tab3.scss';

import { IonButton, IonContent, IonHeader, IonPage, IonToolbar, useIonModal } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';

import SamplingDataForm from '../components/SamplingDataForm/SamplingDataForm';

const Tab3: React.FC = () => {
  const [samplingParams, setSamplingParams] = useState<{
    sampleTime: number;
    variables: Array<string>;
  } | null>();

  const [startSampling, setStartSampling] = useState<boolean>(false);
  const timeIntervalHandler = useRef<any | null>();

  const [presentModal, dismissModal] = useIonModal(SamplingDataForm, {
    data: samplingParams,
    onDismiss: onCloseFormModalParams,
  });

  function onCloseFormModalParams(data: any) {
    if (data) {
      setSamplingParams(data);
      setStartSampling(true);
    }
    dismissModal();
  }

  function onStopSampling() {
    setStartSampling(false);
  }

  useEffect(() => {
    if (!startSampling) {
      clearInterval(timeIntervalHandler.current);
      return;
    }
    timeIntervalHandler.current = setInterval(gettingDataState, samplingParams?.sampleTime);
  }, [startSampling]);

  async function gettingDataState() {
    console.log('Sampling');
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {!startSampling && (
            <IonButton onClick={() => presentModal()} style={{ margin: '8px', width: '80%' }}>
              start sampling
            </IonButton>
          )}
          {startSampling && (
            <IonButton
              color='danger'
              onClick={onStopSampling}
              style={{ margin: '8px', width: '80%' }}
            >
              stop sampling
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
function userRef() {
  throw new Error('Function not implemented.');
}
