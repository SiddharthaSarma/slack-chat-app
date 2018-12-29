import * as actionTypes from './types';

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  };
};

export const signoutUser = () => {
  return {
    type: actionTypes.SIGNOUT_USER
  };
};
