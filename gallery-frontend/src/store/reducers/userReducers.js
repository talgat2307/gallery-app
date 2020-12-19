import {
  LOGOUT_USER,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
} from '../actionTypes';

const initialState = {
  loading: false,
  loginError: null,
  registerError: null,
  userInfo: null,
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {...state, loading: true};
    case USER_REGISTER_FAILURE:
      return {...state, registerError: action.error};
    case USER_LOGIN_REQUEST:
      return { ...state, loading: false };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.user };
    case USER_LOGIN_FAILURE:
      return { ...state, loginError: action.error };
    case LOGOUT_USER:
      return {...state, userInfo: null}
    default:
      return state;
  }
};

export default userReducers;