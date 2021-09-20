import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getRiskContributorData = (data) => {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.currentUser.access_token
		return axios
			.post(`${actionTypes.API_URL}/portfolio_carbon_risk/portfolio_risk_contributors`, data, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
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