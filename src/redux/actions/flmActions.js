import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getPortfolioAlignment = (data) => {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.currentUser.access_token
		return axios
			.post(`${process.env.REACT_APP_API_URL}/forward_looking_metrics/portfolio_alignment`, data, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				}
			})
			.then(result => {
                dispatch(getPortfolioAlignmentSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getPortfolioAlignmentFailed(error))
            })
	};
};

export const getPortfolioAlignmentSuccess=(res)=>{
    return { type: actionTypes.GET_PORTFOLIO_ALIGNMENT_SUCCESS, res };
}
export const getPortfolioAlignmentFailed=(error)=>{
    return { type: actionTypes.GET_PORTFOLIO_ALIGNMENT_FAILED, error };
}

export const getTargetSetting = (data) => {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.currentUser.access_token
		return axios
			.post(`${process.env.REACT_APP_API_URL}/forward_looking_metrics/target_setting`, data, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				}
			})
			.then(result => {
                dispatch(getTargetSettingSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getTargetSettingFailed(error))
            })
	};
};

export const getTargetSettingSuccess=(res)=>{
    return { type: actionTypes.GET_TARGET_SETTING_SUCCESS, res };
}
export const getTargetSettingFailed=(error)=>{
    return { type: actionTypes.GET_TARGET_SETTING_FAILED, error };
}
export const getCompanies = (data) => {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.currentUser.access_token
		return axios
			.post(`${process.env.REACT_APP_API_URL}/forward_looking_metrics/sectors/companies`, data, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				}
			})
			.then(result => {
                dispatch(getCompaniesSuccess(result.data))
				return result.data
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getCompaniesFailed(error))
            })
	};
};

export const getCompaniesSuccess=(res)=>{
    return { type: actionTypes.GET_COMPANIES_SUCCESS, res };
}
export const getCompaniesFailed=(error)=>{
    return { type: actionTypes.GET_COMPANIES_FAILED, error };
}
export const getCompanyProfileData = (data) => {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.currentUser.access_token
		return axios
			.post(`${process.env.REACT_APP_API_URL}/forward_looking_metrics/company_profile`, data, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				}
			})
			.then(result => {
                dispatch(getCompanyProfileDataSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getCompanyProfileDataFailed(error))
            })
	};
};

export const getCompanyProfileDataSuccess=(res)=>{
    return { type: actionTypes.GET_COMPANY_PROFILE_SUCCESS, res };
}
export const getCompanyProfileDataFailed=(error)=>{
    return { type: actionTypes.GET_COMPANY_PROFILE_FAILED, error };
}

export const getCarbonCompanies = (data) => {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.currentUser.access_token
		return axios
			.post(`${process.env.REACT_APP_API_URL}/forward_looking_metrics/carbon_adjusted_returns/available_companies_price`, data, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				}
			})
			.then(result => {
                dispatch(getCarbonCompaniesSuccess(result.data))
				return result.data
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getCarbonCompaniesFailed(error))
            })
	};
};

export const getCarbonCompaniesSuccess=(res)=>{
    return { type: actionTypes.GET_CARBON_COMPANIES_SUCCESS, res };
}
export const getCarbonCompaniesFailed=(error)=>{
    return { type: actionTypes.GET_CARBON_COMPANIES_FAILED, error };
}
export const getCarbonReturnsLineData = (data) => {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.currentUser.access_token
		return axios
			.post(`${process.env.REACT_APP_API_URL}/forward_looking_metrics/carbon_adjusted_returns/linechart`, data, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				}
			})
			.then(result => {
                dispatch(getCarbonReturnsLineDataSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getCarbonReturnsLineDataFailed(error))
            })
	};
};

export const getCarbonReturnsLineDataSuccess=(res)=>{
    return { type: actionTypes.GET_CARBON_RETURNS_LINE_DATA_SUCCESS, res };
}
export const getCarbonReturnsLineDataFailed=(error)=>{
    return { type: actionTypes.GET_CARBON_RETURNS_LINE_DATA_FAILED, error };
}
export const getCarbonReturnsTableData = (data) => {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.currentUser.access_token
		return axios
			.post(`${process.env.REACT_APP_API_URL}/forward_looking_metrics/carbon_adjusted_returns/table`, data, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				}
			})
			.then(result => {
                dispatch(getCarbonReturnsTableDataSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getCarbonReturnsTableDataFailed(error))
            })
	};
};

export const getCarbonReturnsTableDataSuccess=(res)=>{
    return { type: actionTypes.GET_CARBON_RETURNS_TABLE_DATA_SUCCESS, res };
}
export const getCarbonReturnsTableDataFailed=(error)=>{
    return { type: actionTypes.GET_CARBON_RETURNS_TABLE_DATA_FAILED, error };
}