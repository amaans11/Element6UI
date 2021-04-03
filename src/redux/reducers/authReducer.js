import * as types from '../actionTypes';
import produce from 'immer';

const intialState = {
	currentUser: {},
	verifyUserRes: {},
	portfolioList: [],
	userInfo: [],
	currentPortfolio: {},
	currentBenchmark: {}
};

export default function authReducer(state = { ...intialState }, action) {
	switch (action.type) {
		case types.SIGNIN_USER_SUCCESS:
			return produce(state, (draft) => {
				draft.currentUser = action.currentUser;
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
						value: portfolio.PortfolioName
					});
				});
			}
			const currentData = {
				name: portfolioList[0].PortfolioName,
				date: portfolioList[0].Date
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
        draft.currentBenchmark = {}
			});
		case types.GET_USER_INFO:
			return produce(state, (draft) => {
				draft.userInfo = action.res;
			});
		default:
			return state;
	}
}
