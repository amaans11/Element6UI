import * as types from '../actionTypes';
import produce from 'immer';

const intialState = {
	tempScoreData: {},
	companyData: {},
	tempAttribution: {},
	heatmapData: {},
	contributionAnalysis:{}
};

export default function strandedAssetReducer(state = { ...intialState }, action) {
	switch (action.type) {
		case types.GET_TEMP_SCORE_SUCCESS:
			return produce(state, (draft) => {
				draft.tempScoreData.data = action.res;
				draft.tempScoreData.error = '';
			});
		case types.GET_TEMP_SCORE_FAILED:
			return produce(state, (draft) => {
				draft.tempScoreData.data = '';
				draft.tempScoreData.error = action.error;
			});

		case types.GET_COMPANY_ANALYSIS_SUCCESS:
			return produce(state, (draft) => {
				draft.companyData.data = action.res;
				draft.companyData.error = '';
			});
		case types.GET_COMPANY_ANALYSIS_FAILED:
			return produce(state, (draft) => {
				draft.companyData.data = '';
				draft.companyData.error = action.error;
			});
		case types.GET_TEMP_ATTRIBUTION_SUCCESS:
			return produce(state, (draft) => {
				draft.tempAttribution.data = action.res;
				draft.tempAttribution.error = '';
			});
		case types.GET_TEMP_ATTRIBUTION_FAILED:
			return produce(state, (draft) => {
				draft.tempAttribution.data = '';
				draft.tempAttribution.error = action.error;
			});
		case types.GET_HEATMAP_SUCCESS:
			return produce(state, (draft) => {
				draft.heatmapData.data = action.res;
				draft.heatmapData.error = '';
			});
		case types.GET_HEATMAP_FAILED:
			return produce(state, (draft) => {
				draft.heatmapData.data = '';
				draft.heatmapData.error = action.error;
			});
		case types.GET_CONTRIB_ANALYSIS_SUCCESS:
			return produce(state, (draft) => {
				draft.contributionAnalysis.data = action.res;
				draft.contributionAnalysis.error = '';
			});
		case types.GET_CONTRIB_ANALYSIS_FAILED:
			return produce(state, (draft) => {
				draft.contributionAnalysis.data = '';
				draft.contributionAnalysis.error = action.error;
			});

		default:
			return state;
	}
}
