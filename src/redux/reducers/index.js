import { combineReducers } from 'redux';
import auth from './authReducer'
import footprint from './footprintReducer'

const rootReducer =()=> combineReducers({
  auth:auth,
  footprint:footprint
});

export default rootReducer;

