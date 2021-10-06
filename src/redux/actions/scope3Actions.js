import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getScope3Data = (data) => {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.currentUser.access_token
		return axios
			.post(`${process.env.REACT_APP_API_URL}/scope3_materiality/scope3_heatmap`, data, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
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