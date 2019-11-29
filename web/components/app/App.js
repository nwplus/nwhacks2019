import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Login } from '../../containers/auth';

// Components
import { Logout } from '../auth';
import { Admin, adminRoutes } from '../admin';

class App extends React.Component {
  render() {
    const { base } = this.props;

    return (
      <HashRouter basename={base}>
        <Switch>
          {/* Admin */}
          <Route path="*">
            <Switch>
              <Route exact path="/admin/logout" component={Logout} />
              <Route exact path={adminRoutes} component={Admin} />
              <Route>
                <Login redirectUrl="/admin/assessment" />
              </Route>
            </Switch>
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
