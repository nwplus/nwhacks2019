import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../../components/Main';
import Login from '../../components/login/Login';
import SignedIn from '../../components/login/SignedIn';
import './App.sass';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../../store/configureStore';

import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/signed_in" component={SignedIn} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
   </Provider>
  );
};

export default App;
