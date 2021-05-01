import * as types from '../actionTypes';
import produce from 'immer';

const intialState = {
	currentUser: {},
	verifyUserRes: {},
	portfolioList: [],
	userInfo: [],
	currentPortfolio: {},
	currentBenchmark: {},
	currentYear: '',
	currentQuarter: '',
	currentCurrency: '',
	filterItem: {},
	tabValue: 0,
	moduleName: 'Emission',
	isVisible: true,
	reweightFactor: 0,
};

export default function authReducer(state = { ...intialState }, action) {
	switch (action.type) {
		case types.SIGNIN_USER_SUCCESS:
			return produce(state, (draft) => {
				draft.currentUser = action.currentUser;
				draft.currentYear = '2020';
				draft.currentQuarter = 'Q1';
				draft.currentCurrency = 'USD';
				draft.filterItem = {
					sector: 'SASB',
					footprintMetric: 'Revenue',
					marketValue: 'Equity',
					assetClass: 'EqCB',
					inferenceType: 'Avg',
					emission: 'Sc12'
				};
			});

		case types.VERIFY_USER_SUCCESS:
			return produce(state, (draft) => {
				draft.verifyUserRes = action.res;
			});
		case types.GET_PORTFOLIO_LIST_SUCCESS:
			const portfolioList = action.res;
			let result = [];
			if (portfolioList && portfolioList.length > 0) {
				portfolioList.map((portfolio) => {
					result.push({
						label: portfolio.PortfolioName,
						value: portfolio.Date
					});
				});
			}
			const currentData = {
				label: portfolioList[0].PortfolioName,
				value: portfolioList[0].Date
			};
			return produce(state, (draft) => {
				draft.portfolioList = [ ...result ];
				draft.currentPortfolio = {
					...currentData
				};
				draft.currentBenchmark = {
					...currentData
				};
			});
		case types.GET_PORTFOLIO_LIST_FAILURE:
			return produce(state, (draft) => {
				draft.portfolioList = [];
				draft.currentPortfolio = {};
				draft.currentBenchmark = {};
			});
		case types.GET_USER_INFO:
			return produce(state, (draft) => {
				draft.userInfo = action.res;
			});
		case types.SET_PORTFOLIO:
			return produce(state, (draft) => {
				draft.currentPortfolio = action.res;
			});
		case types.SET_BENCHMARK:
			return produce(state, (draft) => {
				draft.currentBenchmark = action.res;
			});
		case types.SET_FILTER_ITEM:
			console.log('test');
			return produce(state, (draft) => {
				draft['filterItem'][action.res.key] = action.res.value;
			});
		case types.SET_TAB_SUCCESS:
			return produce(state, (draft) => {
				draft.tabValue = action.res;
			});
		case types.SET_MODULE_SUCCESS:
			return produce(state, (draft) => {
				draft.moduleName = action.res;
			});
		case types.SET_FILTER_VISIBILITY:
			console.log('test2');
			return produce(state, (draft) => {
				draft.isVisible = action.res;
			});
		default:
			return state;
	}
}
