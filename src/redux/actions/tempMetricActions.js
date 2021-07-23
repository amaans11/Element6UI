import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getTempScoreData = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.TEMP_API_URL}/portfolio_score/`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getTempScoreDataSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getTempScoreDataFailed(error))
            })
	};
};

export const getTempScoreDataSuccess=(res)=>{
    return { type: actionTypes.GET_TEMP_SCORE_SUCCESS, res };
}
export const getTempScoreDataFailed=(error)=>{
    return { type: actionTypes.GET_TEMP_SCORE_FAILED, error };
}


export const getCompanyAnalysisData = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.TEMP_API_URL}/companies_score/`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getCompanyAnalysisDataSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getCompanyAnalysisDataFailed(error))
            })
	};
};

export const getCompanyAnalysisDataSuccess=(res)=>{
    return { type: actionTypes.GET_COMPANY_ANALYSIS_SUCCESS, res };
}
export const getCompanyAnalysisDataFailed=(error)=>{
    return { type: actionTypes.GET_COMPANY_ANALYSIS_FAILED, error };
}


export const getTempAttribution = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.TEMP_API_URL}/attribution/`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getTempAttributionSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getTempAttributionFailed(error))
            })
	};
};

export const getTempAttributionSuccess=(res)=>{
    return { type: actionTypes.GET_TEMP_ATTRIBUTION_SUCCESS, res };
}
export const getTempAttributionFailed=(error)=>{
    return { type: actionTypes.GET_TEMP_ATTRIBUTION_FAILED, error };
}


export const getHeatmapData = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.TEMP_API_URL}/heatmap/`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getHeatmapDataSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getHeatmapDataFailed(error))
            })
	};
};

export const getHeatmapDataSuccess=(res)=>{
    return { type: actionTypes.GET_HEATMAP_SUCCESS, res };
}
export const getHeatmapDataFailed=(error)=>{
    return { type: actionTypes.GET_HEATMAP_FAILED, error };
}


export const getContribAnalysis = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.TEMP_API_URL}/contribution/`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getContribAnalysisSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getContribAnalysisFailed(error))
            })
	};
};

export const getContribAnalysisSuccess=(res)=>{
    return { type: actionTypes.GET_CONTRIB_ANALYSIS_SUCCESS, res };
}
export const getContribAnalysisFailed=(error)=>{
    return { type: actionTypes.GET_CONTRIB_ANALYSIS_FAILED, error };
}


