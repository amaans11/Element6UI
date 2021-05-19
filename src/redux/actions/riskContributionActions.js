import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getRiskContributorData = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/port_risk_contributor/prc`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
				console.log("result",result)
                dispatch(getRiskContributorDataSuccess(result.data))
			})
            .catch(err=>{
				console.log("err",err)
                const error=err.response && err.response.data.message
                dispatch(getRiskContributorDataFailed(error))
            })
	};
};

export const getRiskContributorDataSuccess=(res)=>{
    return { type: actionTypes.GET_RISK_CONTRIBUTOR_SUCCESS, res };
}
export const getRiskContributorDataFailed=(error)=>{
    return { type: actionTypes.GET_RISK_CONTRIBUTOR_FAILED, error };
}