import { combineReducers } from 'redux';
import logReducer from './logReducer';
import authReducer from './authReducer';

export default combineReducers({
  log: logReducer,
  auth: authReducer
});
