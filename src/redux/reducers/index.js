import { combineReducers } from 'redux';
import auth from './authReducer'

const reducers = {
  auth:auth
};

const rootReducer =()=> combineReducers({
  auth:auth
});

export default rootReducer;

