import { combineReducers } from 'redux';
import auth from './authReducer';
import footprint from './footprintReducer';
import scope3 from './scope3Reducer';
import optimization from './optimizationReducer';
import riskContrib from './riskContributorReducer';
import stranded from './strandedAssetReducer';
import tempMetric from './tempMetricReducer';

const rootReducer =()=> combineReducers({
  auth:auth,
  footprint:footprint,
  scope3:scope3,
  optimization:optimization,
  risk:riskContrib,
  stranded:stranded,
  tempMetric:tempMetric
});

export default rootReducer;

