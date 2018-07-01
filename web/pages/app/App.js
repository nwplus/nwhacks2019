import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Main from '../../components/Main';
import Login from '../../components/login/Login';
import Logout from '../../components/login/Logout';
import AdminPanel from '../../components/admin';
import './App.sass';
import NotFound from './NotFound';

import configureStore from '../../services/store';

const initialState = {};

const { store, persistor } = configureStore(initialState);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
