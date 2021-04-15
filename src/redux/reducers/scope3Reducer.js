import * as types from '../actionTypes';
import produce from 'immer';

const intialState = {
	heatmapData: {}
};

export default function authReducer(state = { ...intialState }, action) {
	switch (action.type) {
		case types.GET_SCOPE3_DATA_SUCCESS:
			return produce(state, (draft) => {
				draft.heatmapData.data = action.res;
				draft.heatmapData.error = '';
			});
		case types.GET_SCOPE3_DATA_FAILED:
			return produce(state, (draft) => {
				draft.heatmapData.data = '';
				draft.heatmapData.error = action.error;
			});
		default:
			return state;
	}
}
