import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/app/App';
import './styles/index.sass';

ReactDOM.render(
  <App base={process.env.PUBLIC_URL || ''} />,
  document.getElementById('app')
);
