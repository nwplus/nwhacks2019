import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Main from '../Main';
import { Login, Logout } from '../auth';
import AdminPanel from '../admin';
import { HackerApplication } from '../../containers/application';
import NotFound from '../errors/NotFound';
import Navbar from '../../containers/navbar';
import DashBoard from '../dashboard';
import UIDemo from '../demo';

import { toggleApplication } from '../../actions/featureFlag';

class App extends React.Component {
  componentWillMount() {
    toggleApplication(true);
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleApplication: (enabled) => {
      dispatch(toggleApplication(enabled));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  base: PropTypes.string,
};
