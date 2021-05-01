import * as types from '../actionTypes';
import produce from 'immer';

const intialState = {
	fossilFuel: {},
	coalPower:{}
};

export default function strandedAssetReducer(state = { ...intialState }, action) {
	switch (action.type) {
		case types.GET_FOSSIL_FUEL_DATA_SUCCESS:
			return produce(state, (draft) => {
				draft.fossilFuel.data = action.res;
				draft.fossilFuel.error = '';
			});
		case types.GET_FOSSIL_FUEL_DATA_FAILED:
			return produce(state, (draft) => {
				draft.fossilFuel.data = '';
				draft.fossilFuel.error = action.error;
			});
			case types.GET_COAL_DATA_SUCCESS:
			return produce(state, (draft) => {
				draft.coalPower.data = action.res;
				draft.coalPower.error = '';
			});
		case types.GET_COAL_DATA_FAILED:
			return produce(state, (draft) => {
				draft.coalPower.data = '';
				draft.coalPower.error = action.error;
			});
		default:
			return state;
	}
}
