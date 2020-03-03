import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import feed from './feed';

export default combineReducers({
  alert,
  auth,
  profile,
  feed
});
