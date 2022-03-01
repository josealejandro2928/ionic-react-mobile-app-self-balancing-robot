import {
  IonButton,
  IonContent,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonToolbar,
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
  const [showChart, setShowChart] = useState<boolean>(data?.showChart || false);
  const [showTable, setShowTable] = useState<boolean>(data?.showTable || false);

  useEffect(() => {}, []);

  function onSaveData() {
    onDismiss({ sampleTime: timing, variables, showChart, showTable });
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
              <IonSelectOption value='angularVelocity'>Angular Vel.</IonSelectOption>
              <IonSelectOption value='position'>Position.</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Show chart</IonLabel>
            <IonSelect
              disabled={showTable === true}
              interface='popover'
              value={showChart}
              cancelText='Cancel'
              okText='Ok'
              onIonChange={(e) => setShowChart(e.detail.value)}
            >
              <IonSelectOption value={true}>Yes</IonSelectOption>
              <IonSelectOption value={false}>No</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Show table</IonLabel>
            <IonSelect
              disabled={showChart === true}
              interface='popover'
              value={showTable}
              cancelText='Cancel'
              okText='Ok'
              onIonChange={(e) => setShowTable(e.detail.value)}
            >
              <IonSelectOption value={true}>Yes</IonSelectOption>
              <IonSelectOption value={false}>No</IonSelectOption>
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
          <IonItem>
            Show chart:
            <span style={{ marginLeft: '8px', fontStyle: 'italic' }}>
              {showChart ? 'Yes' : 'No'}
            </span>
          </IonItem>
          <IonItem>
            Show table:
            <span style={{ marginLeft: '8px', fontStyle: 'italic' }}>
              {showTable ? 'Yes' : 'No'}
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
