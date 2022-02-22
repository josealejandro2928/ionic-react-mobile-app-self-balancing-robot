import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import PIDParameters from '../components/PIDParameters';
import './Tab2.scss';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>

        <PIDParameters></PIDParameters>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
