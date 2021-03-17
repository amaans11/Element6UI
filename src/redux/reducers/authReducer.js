import * as types from '../actionTypes';

export default function authReducer(state = {}, action) {
  switch (action.type) {   
    case types.SIGNIN_USER_SUCCESS:
      return {...state,currentUser:action.currentUser}
    case types.VERIFY_USER_SUCCESS:
      return {...state,verifyUserRes:action.res}
    default:
      return state;
  }
}
