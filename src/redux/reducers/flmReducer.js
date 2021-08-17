import * as types from '../actionTypes';
import produce from 'immer';

const intialState = {
	portAlignment: {},
	targetSetting: {},
	companyData: {},
	companyProfile: {},
	carbonReturnsLineData: {},
	carbonReturnsTableData: {},
	carbonCompanyData:{}
};

export default function flmReducer(state = { ...intialState }, action) {
	switch (action.type) {
		case types.GET_PORTFOLIO_ALIGNMENT_SUCCESS:
			return produce(state, (draft) => {
				draft.portAlignment.data = action.res;
				draft.portAlignment.error = '';
			});
		case types.GET_PORTFOLIO_ALIGNMENT_FAILED:
			return produce(state, (draft) => {
				draft.portAlignment.data = '';
				draft.portAlignment.error = action.error;
			});

		case types.GET_TARGET_SETTING_SUCCESS:
			return produce(state, (draft) => {
				draft.targetSetting.data = action.res;
				draft.targetSetting.error = '';
			});
		case types.GET_TARGET_SETTING_FAILED:
			return produce(state, (draft) => {
				draft.targetSetting.data = '';
				draft.targetSetting.error = action.error;
			});
		case types.GET_COMPANIES_SUCCESS:
			return produce(state, (draft) => {
				draft.companyData.data = action.res;
				draft.companyData.error = '';
			});
		case types.GET_COMPANIES_FAILED:
			return produce(state, (draft) => {
				draft.companyData.data = '';
				draft.companyData.error = action.error;
			});
		case types.GET_COMPANY_PROFILE_SUCCESS:
			return produce(state, (draft) => {
				draft.companyProfile.data = action.res;
				draft.companyProfile.error = '';
			});
		case types.GET_COMPANY_PROFILE_FAILED:
			return produce(state, (draft) => {
				draft.companyProfile.data = '';
				draft.companyProfile.error = action.error;
			});

		case types.GET_CARBON_COMPANIES_SUCCESS:
			return produce(state, (draft) => {
				draft.carbonCompanyData.data = action.res;
				draft.carbonCompanyData.error = '';
			});
		case types.GET_CARBON_COMPANIES_FAILED:
			return produce(state, (draft) => {
				draft.carbonCompanyData.data = '';
				draft.carbonCompanyData.error = action.error;
			});
		case types.GET_CARBON_RETURNS_LINE_DATA_SUCCESS:
			return produce(state, (draft) => {
				draft.carbonReturnsLineData.data = action.res;
				draft.carbonReturnsLineData.error = '';
			});
		case types.GET_CARBON_RETURNS_LINE_DATA_FAILED:
			return produce(state, (draft) => {
				draft.carbonReturnsLineData.data = '';
				draft.carbonReturnsLineData.error = action.error;
			});
		case types.GET_CARBON_RETURNS_TABLE_DATA_SUCCESS:
			return produce(state, (draft) => {
				draft.carbonReturnsTableData.data = action.res;
				draft.carbonReturnsTableData.error = '';
			});
		case types.GET_CARBON_RETURNS_TABLE_DATA_FAILED:
			return produce(state, (draft) => {
				draft.carbonReturnsTableData.data = '';
				draft.carbonReturnsTableData.error = action.error;
			});
		default:
			return state;
	}
}
