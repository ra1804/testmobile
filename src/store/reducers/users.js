import {GET_USERS_START, GET_USERS_SUCCESS, GET_USERS_ERROR} from '../types';

const INITIAL_STATE = {
  users: [],
  loading: false,
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_USERS_START:
      return {...state, error: false, loading: true};

    case GET_USERS_SUCCESS:
      return {...state, users: payload, error: false, loading: false};

    case GET_USERS_ERROR:
      return {...state, error: payload, loading: false};
    default:
      return state;
  }
};
