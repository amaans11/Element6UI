import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getFossilFuelData = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
        console.log("test1")
		return axios
			.post(`${actionTypes.API_URL}/stranded_assets/fossil_fuel_footprint`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getFossilFuelDataSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getFossilFuelDataFailed(error))
            })
	};
};

export const getFossilFuelDataSuccess=(res)=>{
    return { type: actionTypes.GET_FOSSIL_FUEL_DATA_SUCCESS, res };
}
export const getFossilFuelDataFailed=(error)=>{
    return { type: actionTypes.GET_FOSSIL_FUEL_DATA_FAILED, error };
}
export const getCoalPowerData = (data) => {
	return async (dispatch, getState) => {
		const clientKey = getState().auth.userInfo.client_key;
		return axios
			.post(`${actionTypes.API_URL}/stranded_assets/coal_power_analysis`, data, {
				headers: {
					'client-key': clientKey
				}
			})
			.then(result => {
                dispatch(getCoalDataSuccess(result.data))
			})
            .catch(err=>{
                const error=err.response && err.response.data.message
                dispatch(getCoalDataFailed(error))
            })
	};
};

export const getCoalDataSuccess=(res)=>{
    return { type: actionTypes.GET_COAL_DATA_SUCCESS, res };
}
export const getCoalDataFailed=(error)=>{
    return { type: actionTypes.GET_COAL_DATA_FAILED, error };
}