import * as types from '../actionTypes';
import produce from 'immer';

const intialState={
    portfolioEmission:{}
}
export default function footprintReducer(state = intialState, action) {
	switch (action.type) {
		case types.GET_PORTFOLIO_EMISSION_SUCCESS:
			return produce(state, (draft) => {
				draft.portfolioEmission.data = action.res;
				draft.portfolioEmission.error = '';
			});
		case types.GET_PORTFOLIO_EMISSION_FAILED:
			return produce(state, (draft) => {
				draft.portfolioEmission.data = {};
				draft.portfolioEmission.error = action.error;
			});
        default:
            return state;
	}
}
