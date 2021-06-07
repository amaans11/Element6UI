import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getScope3Data = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/scope3_materiality/scope3_heatmap`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getScope3DataSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getScope3DataFailed(error))
            })
	};
};

export const getScope3DataSuccess=(res)=>{
    return { type: actionTypes.GET_SCOPE3_DATA_SUCCESS, res };
}
export const getScope3DataFailed=(error)=>{
    return { type: actionTypes.GET_SCOPE3_DATA_FAILED, error };
}