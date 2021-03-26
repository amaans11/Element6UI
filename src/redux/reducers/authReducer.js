import * as types from '../actionTypes';

export default function authReducer(state = {}, action) {
  switch (action.type) {   
    case types.SIGNIN_USER_SUCCESS:
      return {...state,currentUser:action.currentUser}
    case types.VERIFY_USER_SUCCESS:
      return {...state,verifyUserRes:action.res}
    case types.GET_PORTFOLIO_LIST_SUCCESS:
      const portfolioList=action.res
      let result=[]
      if(portfolioList && portfolioList.length > 0){
        portfolioList.map(portfolio=>{
          result.push({
            label:portfolio.PortfolioName,
            value:portfolio.PortfolioName
          })
        })
      }
      return {...state,portfolioList:[...result]}
    case types.GET_PORTFOLIO_LIST_FAILURE:
      return {...state,portfolioList:[]}
    case types.GET_USER_INFO:
      return {...state,userInfo:action.res}
    case types.GET_UPLOAD_PORTFOLIO_LIST_SUCCESS:
      return {...state,uploadPortfolioList:action.res}
    case types.GET_UPLOAD_PORTFOLIO_LIST_FAILED:
        return {...state,uploadPortfolioList:[]}
    default:
      return state;
  }
}
