import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getSummary = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.get(`${process.env.REACT_APP_API_URL}/portfolio/fund_of_funds/?portfolio_ids=${data}`, {
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
			.post(`${process.env.REACT_APP_API_URL}/forward_looking_metrics/portfolio_alignment/fund_of_funds/`, data, {
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
export const getFootprint = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${process.env.REACT_APP_API_URL}/portfolio_footprint/portfolio_emissions/fund_of_funds/`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then((result) => {
                dispatch(getFootprintSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response.data.message
                dispatch(getFootprintFailed(error))
            })
	};
};

export const getFootprintSuccess=(res)=>{
    return { type: actionTypes.GET_FOOTPRINT_SUCCESS, res };
}
export const getFootprintFailed=(error)=>{
    return { type: actionTypes.GET_FOOTPRINT_FAILED, error };
}

export const getTargetSetting = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${process.env.REACT_APP_API_URL}/forward_looking_metrics/target_setting/fund_of_funds/`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then((result) => {
                dispatch(getTargetSettingSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response.data.message
                dispatch(getTargetSettingFailed(error))
            })
	};
};

export const getTargetSettingSuccess=(res)=>{
    return { type: actionTypes.GET_FUND_TARGET_SETTING_SUCCESS, res };
}
export const getTargetSettingFailed=(error)=>{
    return { type: actionTypes.GET_FUND_TARGET_SETTING_FAILED, error };
}



