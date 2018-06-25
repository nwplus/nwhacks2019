import React from 'react';
import { Link } from 'react-router-dom';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <p>I&apos;m a prop!</p>
        <Link to="/login">login</Link>
      </div>
    );
  }
}
