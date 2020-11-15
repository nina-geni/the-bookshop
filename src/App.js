import { BrowserRouter as Router, Switch } from 'react-router-dom';

import * as Routes from './routes';
import './App.scss';
import { RouteWithLayout } from './utilities';
import { BaseLayout } from './layouts';
import { HomePage, BoekenPage, LoginPage, RegistreerPage, WinkelkarPage, DetailBoekenPage, NieuwBoekPage, AdresPage, BetaalPage, AdminPage, EditBoekPage } from './pages';

function App() {
  return (
    <div className="app">
      <Router basename={'/2021-werkstuk-react-app-pgmgent-ninageni/'} >
        <Switch>
          <RouteWithLayout exact path={Routes.LANDING} layout={ BaseLayout } component={ HomePage }/>
          <RouteWithLayout exact path={Routes.BOEKEN} layout={ BaseLayout } component={ BoekenPage }/>
          <RouteWithLayout exact path={Routes.LOGIN} layout={ BaseLayout } component={ LoginPage }/>
          <RouteWithLayout exact path={Routes.REGISTREREN} layout={ BaseLayout } component={ RegistreerPage }/>
          <RouteWithLayout exact path={Routes.WINKELWAGEN} layout={ BaseLayout } component={ WinkelkarPage }/>
          <RouteWithLayout exact path={Routes.BOEK_DETAIL} layout={ BaseLayout } component={ DetailBoekenPage }/>
          <RouteWithLayout exact path={Routes.NIEUW_BOEK} layout={ BaseLayout } component={ NieuwBoekPage }/>
          <RouteWithLayout exact path={Routes.ADRES} layout={ BaseLayout } component={ AdresPage }/>
          <RouteWithLayout exact path={Routes.BETAAL} layout={ BaseLayout } component={ BetaalPage }/>
          <RouteWithLayout exact path={Routes.ADMIN} layout={ BaseLayout } component={ AdminPage }/>
          <RouteWithLayout exact path={Routes.EDIT_BOEK} layout={ BaseLayout } component={ EditBoekPage }/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
