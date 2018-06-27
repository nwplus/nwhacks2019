import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../../components/Main';
import Login from '../../components/login/Login';
import SignedIn from '../../components/login/SignedIn';
import './App.sass';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signed_in" component={SignedIn} />
      </Switch>
    );
  }
}
