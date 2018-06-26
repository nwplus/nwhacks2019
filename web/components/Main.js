import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { removeCurrentUser } from '../actions';
import { auth } from '../firebase';

class Main extends React.Component {
  render() {
    const logOut = () => {
      auth.signOut().then(() => {
        this.props.removeCurrentUser();
      });
    }

    let message = '';

    if (this.props.currentUser) {
      message = `Signed in as ${this.props.currentUser.displayName}`;
    } else {
      message = 'not signed in - please login';
    }

    return (
      <div>
        <p>{ message }</p>
        <br></br>
        <Link to="/login">login</Link>
        <br></br>
        <button onClick={logOut}>logout</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeCurrentUser }, dispatch);
}

function mapStateToProps({currentUser}) {
  return { currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
