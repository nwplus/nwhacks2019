import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

// Containers
import Main from '../../containers/main';
import Navbar from '../../containers/navbar';

// Components
import { Login, Logout } from '../auth';
import AdminPanel from '../admin';
import { HackerApplication } from '../../containers/application';
import NotFound from '../errors/NotFound';
import DashBoard from '../dashboard';

// Demo
import UIDemo from '../demo';

class App extends React.Component {
  render() {
    const { base } = this.props;

    return (
      <BrowserRouter basename={base}>
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
    );
  }
}

export default compose(
  firestoreConnect(['feature_flags']),
)(App);

App.propTypes = {
  base: PropTypes.string,
};
