import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { asyncComponent } from '../wrapper';

// Containers
const Home = asyncComponent(() => import('../home/Home'));
const Navbar = asyncComponent(() => import('../../containers/navbar'));

// Components
const Login = asyncComponent(async () => {
  const auth = await import('../auth');
  return auth.Login;
});
const Logout = asyncComponent(async () => {
  const auth = await import('../auth');
  return auth.Logout;
});
const HackerApplication = asyncComponent(async () => {
  const application = await import('../../containers/application');
  return application.HackerApplication;
});
const AdminPanel = asyncComponent(() => import('../admin'));
const NotFound = asyncComponent(() => import('../errors/NotFound'));
const DashBoard = asyncComponent(() => import('../dashboard'));

// Demo
const UIDemo = asyncComponent(() => import('../demo'));

class App extends React.Component {
  render() {
    const { base } = this.props;

    return (
      <BrowserRouter basename={base}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
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
