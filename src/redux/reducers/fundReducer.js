import * as types from '../actionTypes';
import produce from 'immer';

const intialState = {
	summary:{},
    alignment:{},
    footprint:{},
	targetSetting:{}
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
				draft.alignment.data = action.res;
				draft.alignment.error = '';
			});
        case types.GET_ALIGNMENT_FAILED:
            return produce(state, (draft) => {
                draft.alignment.data = '';
                draft.alignment.error = action.error;
        });
        case types.GET_FOOTPRINT_SUCCESS:
            return produce(state, (draft) => {
				draft.footprint.data = action.res;
				draft.footprint.error = '';
			});
        case types.GET_FOOTPRINT_FAILED:
            return produce(state, (draft) => {
                draft.footprint.data = '';
                draft.footprint.error = action.error;
        });
		case types.GET_FUND_TARGET_SETTING_SUCCESS:
			return produce(state, (draft) => {
                draft.targetSetting.data = action.res;
                draft.targetSetting.error = '';
        });
		case types.GET_FUND_TARGET_SETTING_FAILED:
			return produce(state, (draft) => {
                draft.targetSetting.data = '';
                draft.targetSetting.error = action.error;
        });
		default:
			return state;
	}
}
