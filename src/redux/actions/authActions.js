import * as actionTypes from '../actionTypes';
import axios from 'axios';
import getRequestData from '../../util/RequestData';
import {
	getAvoidedEmissions,
	getCarbonAttribution,
	getDisclosureData,
	getPortfolioEmission,
	getSovereignFootprint
} from './footprintActions';
import { getScope3Data } from './scope3Actions';
import { getPortOptimizationData, getPerformanceAttrData } from './optimizationActions';
import { getRiskContributorData } from './riskContributionActions';
import { getCoalPowerData, getFossilFuelData } from './strandedAssetActions';

const requestApi = async (dispatch, auth) => {
	const moduleName = auth.moduleName;
	const tabValue = auth.tabValue;
	let data = {};

	switch (moduleName) {
		case 'Emission':
			switch (tabValue) {
				case 0:
					data = getRequestData('PORTFOLIO_EMISSION', auth);
					await dispatch(getPortfolioEmission(data));
					break;
				case 1:
					data = getRequestData('CARBON_EMISSION', auth);
					await dispatch(getPortfolioEmission(data));
					break;
				case 2:
					data = getRequestData('SOVEREIGN_FOOTPRINT', auth);
					await dispatch(getSovereignFootprint(data));
					break;
				case 3:
					data = getRequestData('CARBON_ATTRIBUTION', auth);
					await dispatch(getCarbonAttribution(data));
					break;
				case 4:
					const portData = getRequestData('PORT_DISCLOSURE', auth);
					const benchData = getRequestData('PORT_DISCLOSURE', auth);

					await dispatch(getDisclosureData(portData, 'portfolio'));
					await dispatch(getDisclosureData(benchData, 'benchmark'));

					break;
				case 5:
					data = getRequestData('AVOIDED_EMISSION', auth);
					await dispatch(getAvoidedEmissions(data));
					break;
				default:
					data = getRequestData('PORTFOLIO_EMISSION', auth);
					await dispatch(getPortfolioEmission(data));
					break;
			}
			break;
		case 'Scope3':
			switch (tabValue) {
				case 0:
					data = getRequestData('SCOPE3_MATERILITY', auth);
					await dispatch(getScope3Data(data));
					break;
				case 1:
					data = getRequestData('SECTORAL_SCOPE3_MATERILITY', auth);
					await dispatch(getScope3Data(data));
					break;
				default:
					data = getRequestData('SCOPE3_MATERILITY', auth);
					await dispatch(getScope3Data(data));
					break;
			}
			break;
		case 'Optimization':
			switch (tabValue) {
				case 0:
					data = getRequestData('PORTFOLIO_OPTIMIZATION', auth);
					await dispatch(getPortOptimizationData(data));
					break;
				case 1:
					data = getRequestData('PERFORMANCE_ATTRIBUTION', auth);
					await dispatch(getPerformanceAttrData(data));
					break;
				default:
					data = getRequestData('PORTFOLIO_OPTIMIZATION', auth);
					await dispatch(getPortOptimizationData(data));
					break;
			}
			break;
		case 'Carbon risk':
			switch (tabValue) {
				case 0:
					data = getRequestData('RISK_CONTRIBUTOR', auth);
					await dispatch(getRiskContributorData(data));
					break;
				default:
					data = getRequestData('RISK_CONTRIBUTOR', auth);
					await dispatch(getPortOptimizationData(data));
					break;
			}
			break;
		case 'Stranded':
			switch (tabValue) {
				case 0:
					data = getRequestData('FOSSIL_FUEL', auth);
					await dispatch(getFossilFuelData(data));
					break;
				default:
					data = getRequestData('COAL_POWER', auth);
					await dispatch(getCoalPowerData(data));
					break;
			}
			break;
		default:
			switch (tabValue) {
				case 0:
					data = getRequestData('PORTFOLIO_EMISSION', auth);
					await dispatch(getPortfolioEmission(data));
					break;
				case 1:
					data = getRequestData('CARBON_EMISSION', auth);
					await dispatch(getPortfolioEmission(data));
					break;
				case 2:
					data = getRequestData('SOVEREIGN_FOOTPRINT', auth);
					await dispatch(getSovereignFootprint(data));
					break;
				case 3:
					data = getRequestData('CARBON_ATTRIBUTION', auth);
					await dispatch(getCarbonAttribution(data));
					break;
				case 4:
					data = getRequestData('DISCLOSURE', auth);
					await dispatch(getDisclosureData(data));
					break;
				case 5:
					data = getRequestData('AVOIDED_EMISSION', auth);
					await dispatch(getAvoidedEmissions(data));
					break;
				default:
					data = getRequestData('PORTFOLIO_EMISSION', auth);
					await dispatch(getPortfolioEmission(data));
					break;
			}
			break;
	}
};
export const signinUser = (data) => {
	return async (dispatch) => {
		return axios.post(`${actionTypes.API_URL}/accounts/sign_in`, data).then((result) => {
			if (result.data.success) {
				dispatch(signinUserSuccess(result.data));
			} else {
				const error = result.data.message;
				throw new Error(error);
			}
		});
	};
};

export const signinUserSuccess = (currentUser) => {
	return { type: actionTypes.SIGNIN_USER_SUCCESS, currentUser };
};

export const verifyUser = (data) => {
	return async (dispatch) => {
		return axios.post(`${actionTypes.API_URL}/accounts/reset_password`, data).then((result) => {
			if (result.data.success) {
				dispatch(verifyUserSuccess(result.data));
			} else {
				const error = result.data.message;
				throw new Error(error);
			}
		});
	};
};

export const verifyUserSuccess = (res) => {
	return { type: actionTypes.VERIFY_USER_SUCCESS, res };
};

export const getPortfolioList = (client) => {
	return async (dispatch) => {
		return axios.get(`${actionTypes.API_URL}/portfolios/client_new/${client}`).then((result) => {
			if (result.data.status == 'Success') {
				dispatch(getPortfolioListSuccess(result.data.Portfolios));
			} else {
				dispatch(getPortfolioListFailure());
			}
		});
	};
};

export const getPortfolioListSuccess = (res) => {
	return { type: actionTypes.GET_PORTFOLIO_LIST_SUCCESS, res };
};

export const getPortfolioListFailure = () => {
	return { type: actionTypes.GET_PORTFOLIO_LIST_FAILURE };
};

export const getUserInfo = (data) => {
	return async (dispatch) => {
		return axios.post(`${actionTypes.API_URL}/userdata/`, data).then((result) => {
			if (result.data.Status == 'Success') {
				dispatch(getUserInfoSuccess(result.data.data));
			}
		});
	};
};

export const getUserInfoSuccess = (res) => {
	return { type: actionTypes.GET_USER_INFO, res };
};

export const getUploadPortfolioList = (client) => {
	return async (dispatch) => {
		return axios
			.get(`${actionTypes.API_URL}/statuses/portfolio_new/${client}`)
			.then((result) => {
				if (result.data.Status == 'Success') {
					dispatch(getUploadPortfolioListSuccess(result.data));
				} else {
					dispatch(getUploadPortfolioListFailed());
				}
			})
			.catch((error) => {
				dispatch(getUploadPortfolioListFailed());
			});
	};
};

export const getUploadPortfolioListSuccess = (res) => {
	return { type: actionTypes.GET_UPLOAD_PORTFOLIO_LIST_SUCCESS, res };
};
export const getUploadPortfolioListFailed = (res) => {
	return { type: actionTypes.GET_UPLOAD_PORTFOLIO_LIST_FAILED, res };
};

export const updateCurrency = (data) => {
	const { year, quarter, currency } = data;
	return async (dispatch) => {
		return axios
			.get(`${actionTypes.API_URL}/currencies/currency/${year}/${quarter}`)
			.then((result) => {
				if (result.data.status == 'done') {
					const res = {
						...result.data,
						currency
					};
					dispatch(updateCurrencySuccess(res));
				} else {
					dispatch(updateCurrencyFailed({ currency }));
				}
			})
			.catch((error) => {
				dispatch(updateCurrencyFailed({ currency }));
			});
	};
};

export const updateCurrencySuccess = (res) => {
	return { type: actionTypes.UPDATE_CURRENCY_SUCCESS, res };
};
export const updateCurrencyFailed = (res) => {
	return { type: actionTypes.UPDATE_CURRENCY_FAILED, res };
};

export const setPortfolio = (portfolio) => {
	return async (dispatch, getState) => {
		await dispatch(setPortfolioSuccess(portfolio));
		const auth = getState().auth;
		requestApi(dispatch, auth);
	};
};

export const setPortfolioSuccess = (res) => {
	return { type: actionTypes.SET_PORTFOLIO, res };
};
export const setBenchmark = (benchmark) => {
	return async (dispatch, getState) => {
		await dispatch(setBenchmarkSuccess(benchmark));
		const auth = getState().auth;
		requestApi(dispatch, auth);
	};
};

export const setBenchmarkSuccess = (res) => {
	return { type: actionTypes.SET_BENCHMARK, res };
};

export const setFilterItem = (data) => {
	return async (dispatch, getState) => {
		await dispatch(setFilterItemSuccess(data));
		const auth = getState().auth;
		requestApi(dispatch, auth);
	};
};

export const setFilterItemSuccess = (res) => {
	return { type: actionTypes.SET_FILTER_ITEM, res };
};
export const setTabValue = (value) => {
	return async (dispatch) => {
		dispatch(setTabValueSuccess(value));
	};
};

export const setTabValueSuccess = (res) => {
	return { type: actionTypes.SET_TAB_SUCCESS, res };
};
export const setModule = (value) => {
	return async (dispatch) => {
		dispatch(setModuleSuccess(value));
	};
};

export const setModuleSuccess = (res) => {
	return { type: actionTypes.SET_MODULE_SUCCESS, res };
};

export const setFilterVisibility = (value) => {
	return async (dispatch) => {
		dispatch(setFilterVisibilitySuccess(value));
	};
};

export const setFilterVisibilitySuccess = (res) => {
	return { type: actionTypes.SET_FILTER_VISIBILITY, res };
};
