import { persistor } from './configureStore';

export default () => { persistor.purge(); };
