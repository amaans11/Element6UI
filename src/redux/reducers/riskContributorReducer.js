import * as types from '../actionTypes';
import produce from 'immer';

const intialState = {
	riskContribData: {}
};

export default function riskContributorReducer(state = { ...intialState }, action) {
	switch (action.type) {
		case types.GET_RISK_CONTRIBUTOR_SUCCESS:
			return produce(state, (draft) => {
				draft.riskContribData.data = action.res;
				draft.riskContribData.error = '';
			});
		case types.GET_RISK_CONTRIBUTOR_FAILED:
			return produce(state, (draft) => {
				draft.riskContribData.data = '';
				draft.riskContribData.error = action.error;
			});
		default:
			return state;
	}
}
