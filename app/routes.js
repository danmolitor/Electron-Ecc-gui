/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/Pages/HomePage';
import AboutPage from './containers/Pages/AboutPage';
import SecurityPage from './containers/Pages/SecurityPage';
import ReceivePage from './containers/Pages/ReceivePage';
import TransactionPage from './containers/Pages/TransactionPage';
import SendPage from './containers/Pages/SendPage';
import SettingsPage from './containers/Pages/SettingsPage';
import ConfigPage from './containers/Pages/ConfigPage';
import DownloadsPage from './containers/Pages/DownloadsPage';

export default function Routes({route}) {
  return (
    <App route={route}>
      <Switch>
        <Route path="/downloads" component={DownloadsPage} />
        <Route path="/config" component={ConfigPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/transaction" component={TransactionPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/receive" component={ReceivePage} />
        <Route path="/send" component={SendPage} />
        <Route path="/security" component={SecurityPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </App>
  );
}
