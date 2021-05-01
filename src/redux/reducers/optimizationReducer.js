import * as types from '../actionTypes';
import produce from 'immer';

const intialState = {
	optimizationData: {},
	perfAttributionData: {}
};

export default function optimizationReducer(state = { ...intialState }, action) {
	switch (action.type) {
		case types.GET_PORTFOLIO_OPTIMIZATION_SUCCESS:
			return produce(state, (draft) => {
				draft.optimizationData.data = action.res;
				draft.optimizationData.error = '';
			});
		case types.GET_PORTFOLIO_OPTIMIZATION_FAILED:
			return produce(state, (draft) => {
				draft.optimizationData.data = '';
				draft.optimizationData.error = action.error;
			});
		case types.GET_PERFORMANCE_ATTRIBUTION_SUCCESS:
			return produce(state, (draft) => {
				draft.perfAttributionData.data = action.res;
				draft.perfAttributionData.error = '';
			});
		case types.GET_PERFORMANCE_ATTRIBUTION_FAILED:
			return produce(state, (draft) => {
				draft.perfAttributionData.data = '';
				draft.perfAttributionData.error = action.error;
			});

		default:
			return state;
	}
}
