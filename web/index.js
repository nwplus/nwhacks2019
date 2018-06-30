import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
//
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from './reducers';
//
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
//
import App from './pages/app/App';
import './styles/index.sass';
//
// const store = createStore(rootReducer);
// const persistConfig = {
//   key: 'root',
//   storage,
// };
//
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const persistor = persistStore(store)

ReactDOM.render(
  (
    <App />
  ), document.getElementById('app')
);
