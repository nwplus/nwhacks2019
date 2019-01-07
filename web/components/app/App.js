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
import { Admin, adminRoutes } from '../admin';

import { HackerApplication, VolunteerApplication } from '../../containers/application';

import SuccessPage from '../application/hacker/pages/SuccessPage/SuccessPage';
import volunteerSuccessPage from '../application/volunteer/pages/SuccessPage/SuccessPage';
import NotFound from '../errors/NotFound';
import DashBoard from '../dashboard';
import RSVP from '../rsvp';
import volunteerRSVP from '../rsvp/volunteer';

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
              <Route exact path="/admin/login">
                <Login redirectUrl="/admin/assessment" />
              </Route>
              <Route exact path="/admin/logout" component={Logout} />
              <Route exact path={adminRoutes} component={Admin} />
              <Route component={() => <Redirect to="/page_not_found" />} />
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
                <Route path="/application/volunteer" component={VolunteerApplication} />
                <Route path="/success" component={SuccessPage} />
                <Route path="/successVolunteer" component={volunteerSuccessPage} />
                <Route path="/dashboard" component={DashBoard} />
                <Route path="/ui_demo" component={UIDemo} />
                <Route path="/page_not_found" component={NotFound} />
                <Route path="/rsvp/:id" component={RSVP} />
                <Route path="/volunteer-rsvp/:id" component={volunteerRSVP} />
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
