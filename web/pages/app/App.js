import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from '../../components/Main';
import Login from '../../components/login/Login';
import Logout from '../../components/login/Logout';
import './App.sass';

import { store } from '../../services/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
