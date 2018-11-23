import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

// Containers
import Home from '../home/Home';
import Navbar from '../../containers/navbar';
import { Login } from '../../containers/auth';

// Components
import { Logout } from '../auth';
import { AdminPanel, AdminGate } from '../admin';

import { HackerApplication } from '../../containers/application';

import SuccessPage from '../application/hacker/pages/SuccessPage/SuccessPage';
import NotFound from '../errors/NotFound';
import DashBoard from '../dashboard';

// Demo
import UIDemo from '../demo';

class App extends React.Component {
  render() {
    const { base } = this.props;

    return (
      <HashRouter basename={base}>
        <Switch>
          {/* Admin */}
          <Route path="/admin">
            <Switch>
              <Route path="/admin/login">
                <Login />
              </Route>
              <Route path="/admin/logout">
                <Logout />
              </Route>
              <Route path="*">
                <AdminGate>
                  <Switch>
                    {/* These routes are just for demo only, to be finalized later */}
                    <Route path="/admin/home">
                      <AdminPanel />
                    </Route>
                    <Route path="/admin/home2">
                      <AdminPanel />
                    </Route>
                    <Route component={() => <Redirect to="/page_not_found" />} />
                  </Switch>
                </AdminGate>
              </Route>
            </Switch>
          </Route>
          {/* Everything else */}
          <Route path="*">
            <div>
              {/* Only render Navbar outside of admin pages */}
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/application/hacker" component={HackerApplication} />
                <Route path="/success" component={SuccessPage} />
                <Route path="/dashboard" component={DashBoard} />

                <Route path="/ui_demo" component={UIDemo} />
                <Route path="/page_not_found" component={NotFound} />
                {/* Default is page not found */}
                <Route component={() => <Redirect to="/page_not_found" />} />
              </Switch>
            </div>
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default compose(
  firestoreConnect(['feature_flags']),
)(App);

App.propTypes = {
  base: PropTypes.string,
};
