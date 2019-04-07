import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialState = {
  currentUser: null,
  isLoading: false
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      };
    case actionTypes.SIGNOUT_USER:
      return {
        ...initialState,
        loading: false
      };
    default:
      return state;
  }
};
const channelInitialState = {
  currentChannel: null
};
export const channelReducer = (state = channelInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer
});
