import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import PIDParameters from '../components/PIDParameters/PIDParameters';
import './Tab2.scss';

import TabContainer, { TabItem } from '../components/Tab/Tab';


const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>

        {/* <PIDParameters></PIDParameters> */}
        <TabContainer backgroundColor='#222222'>
          <TabItem name='PID Adjustments' >
            <PIDParameters></PIDParameters>
          </TabItem>
          <TabItem name='Robot params'>
            tab #2
          </TabItem>
        </TabContainer>
      </IonContent>
    </IonPage >
  );
};

export default Tab2;
