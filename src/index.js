import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import App from './App';

import './config/ReactotronConfig';
import api from '~/services/api';
import { persistor, store } from './store';
import { signOut } from '~/store/modules/auth/actions';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <App />
      </PersistGate>
    </Provider>
  );
}

const { dispatch } = store;
api.interceptors.response.use(null, err => {
  const { status } = err.response;
  if (status === 401) {
    dispatch(signOut());
  }
  return err;
});
