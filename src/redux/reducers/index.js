import { combineReducers } from 'redux';
import auth from './authReducer'
import footprint from './footprintReducer'
import scope3 from './scope3Reducer'

const rootReducer =()=> combineReducers({
  auth:auth,
  footprint:footprint,
  scope3:scope3
});

export default rootReducer;

