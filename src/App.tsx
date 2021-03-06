import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { gameControllerOutline, analyticsOutline, cogOutline, logoAndroid } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import Header from './components/Header/Header';
import Autonomus from './pages/Autonomus';
import SamplerUpdateState from './components/SamplerUpdateState/SamplerUpdateState';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Header />
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path='/tab1'>
            <Tab1 />
          </Route>
          <Route exact path='/tab2'>
            <Tab2 />
          </Route>
          <Route path='/tab3'>
            <Tab3 />
          </Route>
          <Route path='/tab4'>
            <Autonomus />
          </Route>
          <Route exact path='/'>
            <Redirect to='/tab1' />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab='tab1' href='/tab1'>
            <IonIcon icon={gameControllerOutline} />
            <IonLabel>Driver</IonLabel>
          </IonTabButton>
          <IonTabButton tab='tab4' href='/tab4'>
            <IonIcon icon={logoAndroid} />
            <IonLabel>Auto</IonLabel>
          </IonTabButton>
          <IonTabButton tab='tab2' href='/tab2'>
            <IonIcon icon={cogOutline} />
            <IonLabel>Adj. Controllers</IonLabel>
          </IonTabButton>
          <IonTabButton tab='tab3' href='/tab3'>
            <IonIcon icon={analyticsOutline} />
            <IonLabel>Metrics</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>

    <SamplerUpdateState></SamplerUpdateState>
  </IonApp>
);

export default App;
