import { BrowserRouter as Router, Switch } from 'react-router-dom';

import * as Routes from './routes';
import './App.scss';
import { RouteWithLayout } from './utilities';
import { BaseLayout } from './layouts';
import { HomePage } from './pages';

function App() {
  return (
    <div className="app">
      <Router basename={'/2021-werkstuk-react-app-pgmgent-ninageni/'} >
        <Switch>
          <RouteWithLayout exact path={Routes.LANDING} layout={ BaseLayout } component={ HomePage }/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
