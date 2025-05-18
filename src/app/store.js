/* eslint-disable import/prefer-default-export */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  FLUSH, PAUSE, REHYDRATE, PERSIST, REGISTER, PURGE,
  persistReducer,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import api from '../services/authApi';
import reducers from '../store/reducers';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'municipalities', 'order', 'notification'],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  ...reducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware)
  ),
});

setupListeners(store.dispatch);
