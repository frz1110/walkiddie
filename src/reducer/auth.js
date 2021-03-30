import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT
} from '../actions/types';

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: null
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('access', payload.access);
      localStorage.setItem('refresh', payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh
      }
    case SIGNUP_SUCCESS:
      return {
          ...state,
          isAuthenticated: false
      }
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload
      }
    case LOGIN_FAIL:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null
      }
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null
      }
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null
      }
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}

export default reducer;
