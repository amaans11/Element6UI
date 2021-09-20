import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getPortOptimizationData = (data) => {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.currentUser.access_token
		return axios
			.post(`${actionTypes.API_URL}/portfolio_optimisation/optimisation`, data, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
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
		const accessToken = getState().auth.currentUser.access_token
		return axios
			.post(`${actionTypes.API_URL}/portfolio_optimisation/performance_attribution`, data, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
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