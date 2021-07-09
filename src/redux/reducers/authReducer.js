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
	moduleName: 'Emissions',
	isVisible: true,
	reweightFactor: 0,
	loading: false,
	downloadPortfolioList: [],
	uploadPortfolioRes: {},
	portfolioTableRes:[]
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
					footprintMetric: 'WeightAvgRev',
					marketValue: 'MarketCap',
					assetClass: 'EqCB',
					inferenceType: 'Avg',
					emission: 'Sc12',
					aggregation: 'WATS',
					scenario: '0',
					scoreType: 'shortTerm',
					defaultValue: 3.2,
					year: '1Y',
					materiality: 'matPort',
					intensityScope: 'Sc12',
					portScenario: 'LowEnergyDemand',
					targetScenario: 'IPCC',
					warmingScenario: 'LowEnergyDemand',
					approach: 'RelativeAlignment',
					alignmentYear: '2020'
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
				result = portfolioList.map((portfolio) => {
					return {
						label: portfolio.name,
						value: portfolio.portfolio_id,
						version: portfolio.version
					};
				});
			}
			const currentData = {
				label: portfolioList[0].name,
				value: portfolioList[0].portfolio_id,
				version: portfolioList[0].version
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
			return produce(state, (draft) => {
				draft.isVisible = action.res;
			});
		case types.SET_REWEIGHT_FACTOR:
			return produce(state, (draft) => {
				draft.reweightFactor = action.res;
			});
		case types.SET_LOADING:
			return produce(state, (draft) => {
				draft.loading = action.res;
			});

		case types.LOGOUT_USER:
			return produce(state, (draft) => {
				draft.currentUser = {};
			});
		case types.GET_DOWNLOAD_PORTFOLIOS_SUCCESS:
			return produce(state, (draft) => {
				draft.downloadPortfolioList = action.res;
			});
		case types.GET_DOWNLOAD_PORTFOLIOS_FAILED:
			return produce(state, (draft) => {
				draft.downloadPortfolioList = [];
			});

		case types.GET_DOWNLOAD_DETAILS_SUCCESS:
			return produce(state, (draft) => {
				draft.downloadData = action.res;
			});
		case types.GET_DOWNLOAD_DETAILS_FAILED:
			return produce(state, (draft) => {
				draft.downloadData = [];
			});
		case types.UPLOAD_PORTFOLIO_SUCCESS:
			return produce(state, (draft) => {
				draft.uploadPortfolioRes.data = action.res;
				draft.uploadPortfolioRes.error = '';
			});
		case types.UPLOAD_PORTFOLIO_FAILED:
			return produce(state, (draft) => {
				draft.uploadPortfolioRes.data = {};
				draft.uploadPortfolioRes.error = action.error;
			});
		case types.GET_UPLOAD_PORTFOLIO_LIST_SUCCESS:
			return produce(state, (draft) => {
				draft.portfolioTableRes = action.res;
			});
		case types.GET_UPLOAD_PORTFOLIO_LIST_FAILED:
			return produce(state, (draft) => {
				draft.portfolioTableRes = [];
			});
		default:
			return state;
	}
}
