import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { createBrowserHistory } from 'history';
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
import {
	getTempScoreData,
	getCompanyAnalysisData,
	getTempAttribution,
	getContribAnalysis,
	getHeatmapData
} from './tempMetricActions';
import { getPortfolioAlignment } from './flmActions';

const history = createBrowserHistory();

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
		case 'FLM':
			switch (tabValue) {
				case 0:
					data = getRequestData('PORTFOLIO_ALIGNMENT', auth);
					await dispatch(getPortfolioAlignment(data));
					break;
				case 1:
					data = getRequestData('TARGET_SETTING', auth);
					// await dispatch(getTargetSetting(data));
					break;
				case 2:
					data = getRequestData('COMPANY_PROFILE', auth);
					// await dispatch(getCompanyProfile(data));
					break;
				case 3:
					data = getRequestData('CARBON_ADJUSTED_RETURNS', auth);
					// await dispatch(getCarbonReturns(data));
					break;
				default:
					data = getRequestData('PORTFOLIO_ALIGNMENT', auth);
					await dispatch(getPortfolioAlignment(data));
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
		case 'Temp score':
			switch (tabValue) {
				case 0:
					data = getRequestData('PORT_TEMPERATURE_SCORE', auth);
					await dispatch(getTempScoreData(data));
					break;
				case 1:
					data = getRequestData('COMPANY_ANALYSIS', auth);
					await dispatch(getCompanyAnalysisData(data));
					break;
				case 2:
					data = getRequestData('TEMP_ATTRIBUTION', auth);
					await dispatch(getTempAttribution(data));
					break;
				case 3:
					data = getRequestData('CONTRIBUTION_ANALYSIS', auth);
					await dispatch(getContribAnalysis(data));
					break;
				case 4:
					data = getRequestData('TEMP_HEATMAP', auth);
					await dispatch(getHeatmapData(data));
					break;
				default:
					data = getRequestData('PORT_TEMPERATURE_SCORE', auth);
					await dispatch(getTempScoreData(data));
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
		return axios.post(`${actionTypes.API_URL}/accounts/sign_in`, data).then(async (result) => {
			if (result.data.success) {
				await dispatch(signinUserSuccess(result.data));
				history.push('/');
				window.location.reload();
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
export const setReweightData = (value) => {
	return async (dispatch, getState) => {
		await dispatch(setReweightDataSuccess(value));
		const auth = getState().auth;
		const data = getRequestData('PORTFOLIO_OPTIMIZATION', auth);
		await dispatch(getPortOptimizationData(data));
	};
};

export const setReweightDataSuccess = (res) => {
	return { type: actionTypes.SET_REWEIGHT_FACTOR, res };
};

export const setLoading = (value) => {
	return async (dispatch) => {
		dispatch(setLoadingSuccess(value));
	};
};

export const setLoadingSuccess = (res) => {
	return { type: actionTypes.SET_LOADING, res };
};

export const logoutUser = () => {
	return async (dispatch) => {
		localStorage.setItem('appTheme', 'basic');
		await dispatch(logoutUserSuccess());
		window.location.reload();
	};
};

export const logoutUserSuccess = () => {
	return { type: actionTypes.LOGOUT_USER };
};

export const getDownloadPortfolios = () => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		const user = getState().auth.currentUser.userName;

		return axios
			.get(`${actionTypes.API_URL}/downloads/user/${user}`, {
				headers: {
					'client-key': clientKey
				}
			})
			.then((result) => {
				dispatch(getDownloadPortfoliosSuccess(result.data.Portfolios));
			})
			.catch((err) => {
				const error = err.response.data.message;
				dispatch(getDownloadPortfoliosFailed(error));
			});
	};
};

export const getDownloadPortfoliosSuccess = (res) => {
	return { type: actionTypes.GET_DOWNLOAD_PORTFOLIOS_SUCCESS, res };
};
export const getDownloadPortfoliosFailed = (error) => {
	return { type: actionTypes.GET_DOWNLOAD_PORTFOLIOS_FAILED, error };
};

export const getDownloadDetails = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;

		return axios
			.post(`${actionTypes.API_URL}/files/internal`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then((result) => {
				dispatch(getDownloadDetailsSuccess(result.data.data));
			})
			.catch((err) => {
				const error = err.response.data.message;
				dispatch(getDownloadDetailsFailed(error));
			});
	};
};

export const getDownloadDetailsSuccess = (res) => {
	return { type: actionTypes.GET_DOWNLOAD_DETAILS_SUCCESS, res };
};
export const getDownloadDetailsFailed = (error) => {
	return { type: actionTypes.GET_DOWNLOAD_DETAILS_FAILED, error };
};
export const generateReport = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;

		return axios.post(`${actionTypes.API_URL}/reports_new/full`, data, {
			headers: {
				'client-key': clientKey
			}
		});
	};
};
