import { Alert } from 'react-native';
import { takeLatest, all, put, call } from 'redux-saga/effects';

import { updateSuccess, updateFailure } from './actions';
import api from '~/services/api';

export function* updateUser({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'users', profile);
    yield put(updateSuccess(response.data));
    Alert.alert(`Success`, `Profile updated successfully!`);
  } catch (e) {
    Alert.alert(`Error`, `Error updating profile`);
    yield put(updateFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateUser)]);
