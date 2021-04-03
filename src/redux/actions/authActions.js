import * as actionTypes from '../actionTypes'
import axios from 'axios';

export const signinUser = data => {
  return async dispatch => {
    return axios.post(`${actionTypes.API_URL}/accounts/sign_in`, data)
    .then(result=>{
        if(result.data.success){
            dispatch(signinUserSuccess(result.data))
        }
        else{
            const error=result.data.message
            throw new Error(error)
        }
    })
  };
};

export const signinUserSuccess = currentUser => {
  return { type: actionTypes.SIGNIN_USER_SUCCESS, currentUser };
};

export const verifyUser = data => {
    return async dispatch => {
      return axios.post(`${actionTypes.API_URL}/accounts/reset_password`, data)
      .then(result=>{
          if(result.data.success){
              dispatch(verifyUserSuccess(result.data))
          }
          else{
              const error=result.data.message
              throw new Error(error)
          }
      })
    };
  };
  
  export const verifyUserSuccess = res => {
    return { type: actionTypes.VERIFY_USER_SUCCESS, res };
  };

  export const getPortfolioList = (client) => {
    return async dispatch => {
      return axios.get(`${actionTypes.API_URL}/portfolios/client_new/${client}`)
      .then(result=>{
          if(result.data.status =='Success'){
              dispatch(getPortfolioListSuccess(result.data.Portfolios))
          }
          else{
            dispatch(getPortfolioListFailure())
          }
      })
    };
  };
  
  export const getPortfolioListSuccess = res => {
    return { type: actionTypes.GET_PORTFOLIO_LIST_SUCCESS, res };
  };

  export const getPortfolioListFailure = () => {
    return { type: actionTypes.GET_PORTFOLIO_LIST_FAILURE };
  };

  
  export const getUserInfo = (data) => {
    return async dispatch => {
      return axios.post(`${actionTypes.API_URL}/userdata/`,data)
      .then(result=>{
          if(result.data.Status =='Success'){
              dispatch(getUserInfoSuccess(result.data.data))
          }
      })
    };
  };
  
  export const getUserInfoSuccess = res => {
    return { type: actionTypes.GET_USER_INFO, res };
  };

   
  export const getUploadPortfolioList = (client) => {
    console.log("amaan",client)
    return async dispatch => {
      return axios.get(`${actionTypes.API_URL}/statuses/portfolio_new/${client}`)
      .then(result=>{
          if(result.data.Status =='Success'){
              dispatch(getUploadPortfolioListSuccess(result.data))
          }
          else{
            dispatch(getUploadPortfolioListFailed())
          }
      })
      .catch(error=>{
        dispatch(getUploadPortfolioListFailed())
      })
    };
  };
  
  export const getUploadPortfolioListSuccess = res => {
    return { type: actionTypes.GET_UPLOAD_PORTFOLIO_LIST_SUCCESS, res };
  };
  export const getUploadPortfolioListFailed = res => {
    return { type: actionTypes.GET_UPLOAD_PORTFOLIO_LIST_FAILED, res };
  };


  export const updateCurrency = (data) => {
    const {year,quarter,currency}=data
    return async dispatch => {
      return axios.get(`${actionTypes.API_URL}/currencies/currency/${year}/${quarter}`)
      .then(result=>{
          if(result.data.status =='done'){
            const res={
              ...result.data,
              currency
            }
              dispatch(updateCurrencySuccess(res))
          }
          else{
            dispatch(updateCurrencyFailed({currency}))
          }
      })
      .catch(error=>{
        dispatch(updateCurrencyFailed({currency}))
      })
    };
  };
  
  export const updateCurrencySuccess = res => {
    return { type: actionTypes.UPDATE_CURRENCY_SUCCESS, res };
  };
  export const updateCurrencyFailed = res => {
    return { type: actionTypes.UPDATE_CURRENCY_FAILED, res };
  };

