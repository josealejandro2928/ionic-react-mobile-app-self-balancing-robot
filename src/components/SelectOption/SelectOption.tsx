/* eslint-disable react-hooks/exhaustive-deps */
import { IonIcon, IonItem, IonLabel, IonRippleEffect, useIonAlert } from '@ionic/react';
import { chevronDownOutline } from 'ionicons/icons';
import { useEffect, useRef } from 'react';

export interface ISelectables {
  value: string | boolean | number;
  label: string;
}

const SelectOption = ({
  selectables = [],
  multiple = false,
  header = 'Selectables',
  placeHolder = 'Select',
  value = null,
  selectionChange = (e: any) => {},
  disabled = false,
}: {
  selectables: Array<ISelectables>;
  multiple?: boolean;
  header?: string;
  placeHolder?: string;
  value?: any;
  selectionChange?: Function;
  disabled?: boolean;
}) => {
  const selection = useRef<any>();

  const [presentAlert] = useIonAlert();

  const dataChanged = (e: any) => {
    if (!multiple) {
      selection.current = e.value;
      return;
    }
    selection.current = selection.current || [];
    if (selection?.current?.includes(e.value)) {
      selection.current = selection.current.filter((x: any) => x !== e.value);
    } else {
      selection.current.push(e.value);
    }
  };

  useEffect(() => {
    selection.current = value;
  }, [value]);

  function isSelected(el: any) {
    if (!multiple) {
      return value === el;
    }
    return value?.includes(el);
  }

  function showData() {
    if (!multiple) {
      let dataOption = selectables.find((el) => el.value === value);
      return dataOption?.label;
    } else {
      let dataOptions = selectables.filter((el) => value?.includes(el.value))?.map((e) => e.label);
      let serial: string = dataOptions?.slice(0, 3)?.join(',') || ' ';

      if (serial?.length > 20) {
        return serial.substring(0, 20) + '...';
      } else {
        return serial;
      }
    }
  }

  function onOpenAlert() {
    let newOptions = selectables.map((data) => {
      return {
        name: data.label,
        type: multiple ? 'checkbox' : 'radio',
        label: data.label,
        value: data.value,
        handler: (e: any) => {
          dataChanged(e);
        },
        checked: isSelected(data.value),
      };
    });
    presentAlert({
      header,
      inputs: newOptions as any,
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: () => {
            if (multiple) {
              selectionChange([...selection.current]);
            } else {
              selectionChange(selection.current);
            }
          },
        },
      ],
    });
  }

  return (
    <>
      <IonItem disabled={disabled} className='ion-activatable ripple-parent' onClick={onOpenAlert}>
        <IonLabel>{placeHolder}</IonLabel>
        <IonLabel slot='end'>
          {showData()}{' '}
          <IonIcon
            style={{ margin: '0px 4px', color: '#fff', fontSize: '12px' }}
            icon={chevronDownOutline}
          />
        </IonLabel>
        <IonRippleEffect></IonRippleEffect>
      </IonItem>
    </>
  );
};

export default SelectOption;
