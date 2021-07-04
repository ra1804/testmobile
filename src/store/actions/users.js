import getUsers from '../../api/getUsers';
import {GET_USERS_START, GET_USERS_SUCCESS, GET_USERS_ERROR} from '../types';

export const loadingStart = () => dispatch =>
  dispatch({
    type: GET_USERS_START,
  });

export const getUsersSuccess = () => async dispatch => {
  dispatch({
    type: GET_USERS_START,
  });

  try {
    const {data} = await getUsers();
    return dispatch({
      type: GET_USERS_SUCCESS,
      payload: data.data,
    });
  } catch ({response}) {
    return dispatch({
      type: GET_USERS_ERROR,
      payload: response.status,
    });
  }
};
