export function updateRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateFailure(data) {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
    payload: { data },
  };
}
