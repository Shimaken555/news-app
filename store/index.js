import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/user';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


//storeにuserを追加した
const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['user'],
}

const persistedReducer = persistReducer(persistConfig , rootReducer)

const store = createStore(persistedReducer, composeWithDevTools());

export const persistor = persistStore(store);
export default store;
