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
// export const getSovereignFootprint = (data) => {
// 	return async (dispatch, getState) => {
// 		const clientKey = getState().auth.userInfo.client_key;
// 		return axios
// 			.post(`${actionTypes.API_URL}/sovereign_footprint/sf`, data, {
// 				headers: {
// 					'client-key': clientKey
// 				}
// 			})
// 			.then((result) => {
//                 dispatch(getSovereignFootprintSuccess(result.data))
// 			})
//             .catch(err=>{
//                 const error=err.response.data.message
//                 dispatch(getSovereignFootprintFailed(error))
//             })
// 	};
// };

// export const getSovereignFootprintSuccess=(res)=>{
//     return { type: actionTypes.GET_PORTFOLIO_EMISSION_SUCCESS, res };
// }
// export const getSovereignFootprintFailed=(error)=>{
//     return { type: actionTypes.GET_PORTFOLIO_EMISSION_FAILED, error };
// }