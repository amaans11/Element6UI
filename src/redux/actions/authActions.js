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

  // export const getPortfolioList = () => {
  //   return async dispatch => {
  //     return axios.post(`${actionTypes.API_URL}/accounts/reset_password`, data)
  //     .then(result=>{
  //         if(result.data.success){
  //             dispatch(verifyUserSuccess(result.data))
  //         }
  //         else{
  //             const error=result.data.message
  //             throw new Error(error)
  //         }
  //     })
  //   };
  // };
  
  // export const verifyUserSuccess = res => {
  //   return { type: actionTypes.VERIFY_USER_SUCCESS, res };
  // };

  

