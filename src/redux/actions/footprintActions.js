import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getPortfolioEmission = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/portfolio_emissions/portfolio_intensity`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                console.log("result",result)
                dispatch(getPortfolioEmissionSuccess(result.data))
			})
            .catch(err=>{
                console.log("err>>",err)
                const error=err.response && err.response.data.message
                dispatch(getPortfolioEmissionFailed(error))
            })
	};
};

export const getPortfolioEmissionSuccess=(res)=>{
    return { type: actionTypes.GET_PORTFOLIO_EMISSION_SUCCESS, res };
}
export const getPortfolioEmissionFailed=(error)=>{
    return { type: actionTypes.GET_PORTFOLIO_EMISSION_FAILED, error };
}
export const getSovereignFootprint = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/sovereign_footprint/sf`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then((result) => {
                dispatch(getSovereignFootprintSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response.data.message
                dispatch(getSovereignFootprintFailed(error))
            })
	};
};

export const getSovereignFootprintSuccess=(res)=>{
    return { type: actionTypes.GET_SOV_FOOTPRINT_SUCCESS, res };
}
export const getSovereignFootprintFailed=(error)=>{
    return { type: actionTypes.GET_SOV_FOOTPRINT_FAILED, error };
}
export const getAvoidedEmissions = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/avoided_emissions/ae`, data, {
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
			.post(`${actionTypes.API_URL}/disclosure/d`, data, {
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
			.post(`${actionTypes.API_URL}/attribution_new/carbon`, data, {
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

