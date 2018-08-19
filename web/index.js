import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './components/app/App';
import './styles/index.sass';

import { store, persistor } from './services/store/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App base={process.env.PUBLIC_URL || ''} />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
