import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getRiskContributorData = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/portfolio_carbon_risk/portfolio_risk_contributors`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getRiskContributorDataSuccess(result.data))
			})
            .catch(err=>{
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