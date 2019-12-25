import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import { signFailure, signInSuccess, signUpSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'auth', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(`Error`, `User cannot be a provider`);
      return;
    }

    yield put(signInSuccess(token, user));
  } catch (e) {
    Alert.alert(`Error`, `Error signing in!`);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    yield put(signUpSuccess());
  } catch (e) {
    Alert.alert(`Error`, `Error registering!`);
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function setTokenMid({ payload }) {
  if (!payload) {
    return;
  }
  setToken({ payload: { auth: payload } });
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_SUCCESS', setTokenMid),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
