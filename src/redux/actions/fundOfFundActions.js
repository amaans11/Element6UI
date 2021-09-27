import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getSummary = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.get(`${actionTypes.API_URL}/portfolio/fund_of_funds/?portfolio_ids=${data}`, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getSummarySuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getSummaryFailed(error))
            })
	};
};

export const getSummarySuccess=(res)=>{
    return { type: actionTypes.GET_SUMMARY_SUCCESS, res };
}
export const getSummaryFailed=(error)=>{
    return { type: actionTypes.GET_SUMMARY_FAILED, error };
}
export const getAlignment = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/forward_looking_metrics/portfolio_alignment/fund_of_funds/`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then((result) => {
                dispatch(getAlignmentSuccess(result.data))
			})
           
	};
};

export const getAlignmentSuccess=(res)=>{
    return { type: actionTypes.GET_ALIGNMENT_SUCCESS, res };
}
export const getAlignmentFailed=(error)=>{
    return { type: actionTypes.GET_ALIGNMENT_FAILED, error };
}
export const getAvoidedEmissions = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/portfolio_footprint/avoided_emissions`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then((result) => {
                dispatch(getAvoidedEmissionsSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response.data.message
                dispatch(getAvoidedEmissionsFailed(error))
            })
	};
};

export const getAvoidedEmissionsSuccess=(res)=>{
    return { type: actionTypes.GET_AVOIDED_EMISSIONS_SUCCESS, res };
}
export const getAvoidedEmissionsFailed=(error)=>{
    return { type: actionTypes.GET_AVOIDED_EMISSIONS_FAILED, error };
}

export const getDisclosureData = (data,type) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/portfolio_footprint/disclosure`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then((result) => {
                dispatch(getDisclosureDataSuccess(result.data,type))
			})
            .catch(err=>{
                const error=err.response.data.message
                dispatch(getDisclosureDataFailed(error,type))
            })
	};
};

export const getDisclosureDataSuccess=(res,portType)=>{
    return { type: actionTypes.GET_DISCLOSURE_SUCCESS, res:res,portType:portType };
}
export const getDisclosureDataFailed=(error,portType)=>{
    return { type: actionTypes.GET_DISCLOSURE_FAILED, error,portType:portType };
}


export const getCarbonAttribution = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/portfolio_footprint/carbon_attribution`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then((result) => {
                dispatch(getCarbonAttributionSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response.data.message
                dispatch(getCarbonAttributionFailed(error))
            })
	};
};

export const getCarbonAttributionSuccess=(res)=>{
    return { type: actionTypes.GET_CARBON_ATTRIBUTION_SUCCESS, res };
}
export const getCarbonAttributionFailed=(error)=>{
    return { type: actionTypes.GET_CARBON_ATTRIBUTION_FAILED, error };
}

