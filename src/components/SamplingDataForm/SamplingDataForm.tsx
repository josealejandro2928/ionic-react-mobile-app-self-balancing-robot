import {
  IonButton,
  IonContent,
  IonItem,
  IonItemDivider,
  IonList,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import SelectOption from '../SelectOption/SelectOption';
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
  const [dataDisplayed, setDataDisplayed] = useState<boolean>(data?.dataDisplayed || 'chart');

  useEffect(() => {}, []);

  function onSaveData() {
    onDismiss({ sampleTime: timing, variables, dataDisplayed });
  }

  return (
    <IonPage>
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
            <SelectOption
              value={timing}
              selectionChange={setTiming}
              placeHolder='Timing'
              header='Timing'
              selectables={[
                { value: 75, label: '75 ms' },
                { value: 100, label: '100 ms' },
                { value: 150, label: '150 ms' },
                { value: 200, label: '200 ms' },
              ]}
            />

            <SelectOption
              value={variables}
              multiple
              selectionChange={setVariables}
              placeHolder='Variables'
              header='Variables'
              selectables={[
                { value: 'incliAngle', label: 'Inclination' },
                { value: 'linearVelocity', label: 'Linear Vel.' },
                { value: 'angularVelocity', label: 'Angular Vel.' },
                { value: 'position', label: 'Position.' },
              ]}
            ></SelectOption>

            <SelectOption
              value={dataDisplayed}
              selectionChange={setDataDisplayed}
              placeHolder='Data displayed as'
              header='Data displayed as'
              selectables={[
                { value: 'chart', label: 'Chart' },
                { value: 'table', label: 'Table' },
              ]}
            ></SelectOption>

            <IonItemDivider>Your Selections</IonItemDivider>
            <IonItem>
              Variables:
              <span style={{ marginLeft: '8px', fontStyle: 'italic' }}>
                {variables?.length
                  ? variables?.reduce((curr, prev) => prev + ', ' + curr, '')
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
              Show data as:
              <span style={{ marginLeft: '8px', fontStyle: 'italic' }}>{dataDisplayed}</span>
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
    </IonPage>
  );
};

export default SamplingDataForm;
