import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialState = {
  currentUser: null,
  isLoading: true
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      console.log(action.payload);
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: userReducer
});
