import localStorage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';


export const persistConfig = {
  key: 'root',
  storage: localStorage,
  stateReconciler: hardSet,
  blacklist: ['firestore'],
};
