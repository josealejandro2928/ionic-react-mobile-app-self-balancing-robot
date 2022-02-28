import {
  IonButton,
  IonContent,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  useIonModal,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import './SamplingDataForm.scss';

const SamplingDataForm = ({
  data,
  onDismiss = (data: any) => {},
}: {
  data: any;
  onDismiss: Function;
}) => {
  const [timing, setTiming] = useState<number>(data?.sampleTime || 100);
  const [variables, setVariables] = useState<string[]>(data?.variables || ['incliAngle']);

  useEffect(() => {
    console.log('Enter here');
  }, []);

  function onSaveData() {
    onDismiss({ sampleTime: timing, variables });
  }

  return (
    <IonContent>
      <IonToolbar>
        <h4 className='ion-padding-start'>Sampling Parameters</h4>

        <IonButton
          onClick={() => onDismiss(false)}
          style={{ margingRight: '16px !important' }}
          slot='end'
          fill='clear'
        >
          Close
        </IonButton>
      </IonToolbar>
      <div className='SamplingDataForm'>
        <IonList>
          <IonItemDivider>Parameters</IonItemDivider>
          <IonItem>
            <IonLabel>Timing</IonLabel>
            <IonSelect
              value={timing}
              cancelText='Cancel'
              okText='Ok'
              onIonChange={(e) => setTiming(e.detail.value)}
            >
              <IonSelectOption value={75}>75 ms</IonSelectOption>
              <IonSelectOption value={100}>100 ms</IonSelectOption>
              <IonSelectOption value={150}>150 ms</IonSelectOption>
              <IonSelectOption value={200}>200 ms</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Variables</IonLabel>
            <IonSelect
              value={variables}
              multiple={true}
              cancelText='Cancel'
              okText='Ok'
              onIonChange={(e) => setVariables(e.detail.value)}
            >
              <IonSelectOption value='incliAngle'>Inclination</IonSelectOption>
              <IonSelectOption value='linearVelocity'>Linear Vel.</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItemDivider>Your Selections</IonItemDivider>
          <IonItem>
            Variables:
            <span style={{ marginLeft: '8px', fontStyle: 'italic' }}>
              {variables.length
                ? variables.reduce((curr, prev) => prev + ', ' + curr, '')
                : '(none selected)'}
            </span>
          </IonItem>
          <IonItem>
            Sampling:
            <span style={{ marginLeft: '8px', fontStyle: 'italic' }}>
              {timing ? timing + ' ms' : '(none selected)'}
            </span>
          </IonItem>
        </IonList>
        <p style={{ textAlign: 'center' }}>
          <IonButton
            disabled={!timing || !variables || !variables?.length}
            onClick={() => onSaveData()}
            style={{ margin: '8px', width: '80%' }}
          >
            start sampling
          </IonButton>
        </p>
      </div>
    </IonContent>
  );
};

export default SamplingDataForm;
