import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getPortOptimizationData = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/opt/`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getPortOptimizationSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getPortOptimizationFailed(error))
            })
	};
};

export const getPortOptimizationSuccess=(res)=>{
    return { type: actionTypes.GET_PORTFOLIO_OPTIMIZATION_SUCCESS, res };
}
export const getPortOptimizationFailed=(error)=>{
    return { type: actionTypes.GET_PORTFOLIO_OPTIMIZATION_FAILED, error };
}

export const getPerformanceAttrData = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/attribution_new/performance`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getPerformanceAttrDataSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getPerformanceAttrDataFailed(error))
            })
	};
};

export const getPerformanceAttrDataSuccess=(res)=>{
    return { type: actionTypes.GET_PERFORMANCE_ATTRIBUTION_SUCCESS, res };
}
export const getPerformanceAttrDataFailed=(error)=>{
    return { type: actionTypes.GET_PERFORMANCE_ATTRIBUTION_FAILED, error };
}