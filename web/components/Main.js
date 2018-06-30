import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';
// import { removeCurrentUser } from '../actions';
// import { auth } from '../firebase';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.firebase.auth().currentUser
    }
  }

  componentDidMount() {
    this.unregisterAuthObserver = this.props.firebase.auth().onAuthStateChanged(
        (user) => this.setState({currentUser: user})
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    // const logOut = () => {
    //   this.props.firebase.auth().signOut().then(() => {
    //     this.props.removeCurrentUser();
    //   });
    // }

    let message = '';

    // if (this.props.firebase.auth().currentUser) {
    //   message = `Signed in as ${this.props.firebase.auth().currentUser.displayName}`;
    // } else {
    //   message = 'not signed in - please login';
    // }

    if (this.state.currentUser) {
      message = `Signed in as ${this.state.currentUser.displayName}`;
      return (
        <div>
          <p>{ message }</p>
          <br></br>
          <button onClick={this.props.firebase.logout}>logout</button>
        </div>
      );
    } else {
      message = 'not signed in - please login';
      return (
        <div>
          <p>{ message }</p>
          <br></br>
          <Link to="/login">login</Link>
        </div>
      );
    }
  }
}

export default firebaseConnect()(Main)


// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ removeCurrentUser }, dispatch);
// }
//
// function mapStateToProps({currentUser}) {
//   return { currentUser };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Main);
