import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import PIDParameters from '../components/PIDParameters/PIDParameters';
import './Tab2.scss';

import TabContainer, { TabItem } from 'tabs-react-component';
import RobotParams from '../components/RobotParams/RobotParams';
import 'tabs-react-component/dist/index.css';
import { isPlatform } from '@ionic/react';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        {isPlatform('ios') && <br />}

        <TabContainer lazy transitionMs={375} backgroundColor='#222222'>
          <TabItem name='PID Adjustments' >
            <div style={{ padding: '4px 0px' }}>
              <PIDParameters></PIDParameters>
            </div>
          </TabItem>
          <TabItem name='Robot params'>
            <div style={{ padding: '4px 0px' }}>
              <RobotParams></RobotParams>
            </div>
          </TabItem>
        </TabContainer>
      </IonContent>
    </IonPage >
  );
};

export default Tab2;
