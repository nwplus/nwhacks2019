import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Main from '../Main';
import { Logout } from '../auth';
import { Login } from '../../containers/auth';
import AdminPanel from '../admin';
import { HackerApplication } from '../application';
import NotFound from '../errors/NotFound';
import Navbar from '../../containers/navbar';
import DashBoard from '../dashboard';
import UIDemo from '../demo';

import { store, persistor } from '../../services/store/configureStore';

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/application/hacker" component={HackerApplication} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/ui_demo" component={UIDemo} />
            <Route path="/page_not_found" component={NotFound} />
            <Route component={() => <Redirect to="/page_not_found" />} />
          </Switch>
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
