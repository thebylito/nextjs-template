import { HYDRATE } from 'next-redux-wrapper';

export const Types = {
  GET_SUCCESS: 'auth/GET_SUCCESS',
  // Type para refresh token
  GET_REFRESH_TOKEN_REQUEST: 'auth/GET_REFRESH_TOKEN_REQUEST',
  GET_REFRESH_TOKEN_SUCCESS: 'auth/GET_REFRESH_TOKEN_SUCCESS',
  GET_REFRESH_TOKEN_FAILURE: 'auth/GET_REFRESH_TOKEN_FAILURE',
  // LOGOUT
  GET_LOGOUT_SUCCESS: 'auth/GET_LOGOUT_SUCCESS',
  GET_LOGOUT_REQUEST: 'auth/GET_LOGOUT_REQUEST',
};

const initialState = {
  access_token: '',
  refresh_token: '',
  isAuth: false,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.auth };
    case Types.GET_REQUEST:
      return { ...state, loading: true, error: null };
    case Types.GET_SUCCESS || Types.GET_REFRESH_TOKEN_SUCCESS:
      return {
        ...action.payload,
        isAuth: true,
        loading: false,
        error: null,
      };
    case Types.GET_FAILURE:
      return { ...initialState, error: action.payload };
    case Types.GET_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export const Creators = {
  getSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: data,
  }),
  getLogoutRequest: () => ({
    type: Types.GET_LOGOUT_REQUEST,
  }),
  getLogoutSuccess: () => ({
    type: Types.GET_LOGOUT_SUCCESS,
  }),
  // Refresh Token
  getLoginRefreshTokenRequest: () => ({
    type: Types.GET_REFRESH_TOKEN_REQUEST,
  }),
  getLoginRefreshTokenSuccess: data => ({
    type: Types.GET_REFRESH_TOKEN_SUCCESS,
    payload: data,
  }),
  getLoginRefreshTokenFailure: () => ({
    type: Types.GET_REFRESH_TOKEN_FAILURE,
  }),
};
