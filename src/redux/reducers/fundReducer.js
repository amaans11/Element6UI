import * as types from '../actionTypes';
import produce from 'immer';

const intialState = {
	summary:{},
    alignment:{}
};

export default function flmReducer(state = { ...intialState }, action) {
	switch (action.type) {
		case types.GET_SUMMARY_SUCCESS:
			return produce(state, (draft) => {
				draft.summary.data = action.res;
				draft.summary.error = '';
			});
		case types.GET_SUMMARY_FAILED:
			return produce(state, (draft) => {
				draft.summary.data = '';
				draft.summary.error = action.error;
			});
        case types.GET_ALIGNMENT_SUCCESS:
            return produce(state, (draft) => {
                console.log("action>>",action.res)
				draft.alignment.data = action.res;
				draft.alignment.error = '';
			});
        case types.GET_ALIGNMENT_FAILED:
            return produce(state, (draft) => {
                draft.alignment.data = '';
                draft.alignment.error = action.error;
        });
		default:
			return state;
	}
}
