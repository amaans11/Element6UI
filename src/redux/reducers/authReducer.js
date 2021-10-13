import * as types from '../actionTypes'
import produce from 'immer'

const intialState = {
  currentUser: {},
  verifyUserRes: {},
  portfolioList: [],
  userInfo: {},
  currentPortfolio: {},
  currentBenchmark: {},
  currentYear: '',
  currentQuarter: '',
  currentCurrency: '',
  filterItem: {},
  tabValue: 0,
  moduleName: 'Emissions',
  isVisible: true,
  reweightFactor: 0,
  loading: false,
  downloadPortfolioList: [],
  uploadPortfolioRes: {},
  portfolioTableRes: [],
  changeEmailRes: '',
  selectedDownloadPort: ["summary"],
  currencyFixRate:{},
  allPortfolios:[],
  fundsPortList:[],
  currentFundsPortfolio:''
}

export default function authReducer(state = { ...intialState }, action) {
  switch (action.type) {
    case types.SIGNIN_USER_SUCCESS:
      return produce(state, (draft) => {
        draft.currentUser = action.currentUser
        draft.currentYear = '2021'
        draft.currentQuarter = 'Q2'
        draft.currentCurrency = 'USD'
		    draft.selectedDownloadMenu =['summary']
        draft.filterItem = {
          sector: 'SASB',
          footprintMetric: 'WeightAvgRev',
          marketValue: 'MarketCap',
          assetClass: ["Eq", "CB"],
          inferenceType: 'Avg',
          emission: 'Sc12',
          aggregation: 'WATS',
          scenario: '0',
          scoreType: 'shortTerm',
          defaultValue: '3.2',
          year: '1Y',
          materiality: 'matPort',
          intensityScope: 'Sc12',
          portScenario: 'LowEnergyDemand',
          targetScenario: 'IPCC',
          warmingScenario: 'LowEnergyDemand',
          approach: 'RelativeAlignment',
          alignmentYear: '2020',
          returnYear: '3',
          strategy: 'momentum',
        }
      })

    case types.VERIFY_USER_SUCCESS:
      return produce(state, (draft) => {
        draft.verifyUserRes = action.res
      })
    case types.GET_PORTFOLIO_LIST_SUCCESS:
      const portfolioList = action.res
      let result = []
      if (portfolioList && portfolioList.length > 0) {
         portfolioList.map((portfolio) => {
              result.push({
                  label: portfolio.name,
                  value: portfolio.portfolio_id,
                  version: portfolio.version,
              })
        })
      }
      const currentData = {
        label: portfolioList[0].name,
        value: portfolioList[0].portfolio_id,
        version: portfolioList[0].version,
      }
      return produce(state, (draft) => {
        draft.portfolioList = [...result]
        draft.currentPortfolio = {
          ...currentData,
        }
        draft.currentBenchmark = {
          ...currentData,
        }
      })
    case types.GET_PORTFOLIO_LIST_FAILURE:
      return produce(state, (draft) => {
        draft.portfolioList = []
        draft.currentPortfolio = {}
        draft.currentBenchmark = {}
      })
    case types.GET_FUNDS_PORTFOLIO_LIST_SUCCESS:
      const list = action.res
      let res = []
      if (list && list.length > 0) {
         list.map((portfolio) => {
          if(portfolio.is_parent){
              res.push({
                  label: portfolio.name,
                  value: portfolio.portfolio_id,
                  version: portfolio.version,
              })
          }
        })
      }
      const fundsData = {
        label: res[0].label,
        value: res[0].value,
        version: res[0].version,
      }
      return produce(state, (draft) => {
        draft.fundsPortList = [...res]
        draft.currentFundsPortfolio = {
          ...fundsData}
        draft.allPortfolios = action.res
        
      })
    case types.GET_FUNDS_PORTFOLIO_LIST_FAILURE:
      return produce(state, (draft) => {
        draft.fundsPortList = []
        draft.currentFundsPortfolio = {}
      })

    case types.GET_USER_INFO:
      return produce(state, (draft) => {
        draft.userInfo = action.res
       
      })
    case types.UPDATE_CURRENCY_SUCCESS:
      return produce(state, (draft) => {
        draft.currentYear = action.res.year
        draft.currentQuarter = action.res.quarter
        draft.currentCurrency = action.res.currency
      })
    case types.SET_PORTFOLIO:
      return produce(state, (draft) => {
        draft.currentPortfolio = action.res
      })
      case types.SET_FUNDS_PORTFOLIO:
      return produce(state, (draft) => {
        draft.currentFundsPortfolio = action.res
      })
    case types.SET_BENCHMARK:
      return produce(state, (draft) => {
        draft.currentBenchmark = action.res
      })
    case types.SET_FILTER_ITEM:
      return produce(state, (draft) => {
        draft['filterItem'][action.res.key] = action.res.value
      })
    case types.SET_TAB_SUCCESS:
      return produce(state, (draft) => {
        draft.tabValue = action.res
      })
    case types.SET_MODULE_SUCCESS:
      return produce(state, (draft) => {
        draft.moduleName = action.res
      })
    case types.SET_FILTER_VISIBILITY:
      return produce(state, (draft) => {
        draft.isVisible = action.res
      })
    case types.SET_REWEIGHT_FACTOR:
      return produce(state, (draft) => {
        draft.reweightFactor = action.res
      })
    case types.SET_LOADING:
      return produce(state, (draft) => {
        draft.loading = action.res
      })

    case types.LOGOUT_USER:
      return produce(state, (draft) => {
        draft.currentUser = {}
        draft.userInfo = {}
        draft.verifyUserRes = {}
        draft.portfolioList = []
        draft.currentPortfolio = {}
        draft.currentBenchmark = {}
        draft.currentYear = ''
        draft.currentQuarter = ''
        draft.currentCurrency = ''
        draft.loading = false
        draft.filterItem = {}
        draft.downloadPortfolioList = []
        draft.uploadPortfolioRes = {}
        draft.portfolioTableRes = []
      })
    case types.GET_DOWNLOAD_PORTFOLIOS_SUCCESS:
      return produce(state, (draft) => {
        const portfolioList = action.res
        let result = []
        if (portfolioList && portfolioList.length > 0) {
          result = portfolioList.map((portfolio) => {
            return {
              label: portfolio.name,
              value: portfolio.portfolio_id,
              version: portfolio.version,
            }
          })
        }
        const currentPortfolio = {
          label: portfolioList[0].name,
          value: portfolioList[0].portfolio_id,
          version: portfolioList[0].version,
        }

        draft.downloadPortfolioList = result
        draft.selectedDownloadPort = currentPortfolio
      })
    case types.GET_DOWNLOAD_PORTFOLIOS_FAILED:
      return produce(state, (draft) => {
        draft.downloadPortfolioList = []
      })

    case types.UPLOAD_PORTFOLIO_SUCCESS:
      return produce(state, (draft) => {
        draft.uploadPortfolioRes.data = action.res
        draft.uploadPortfolioRes.error = ''
      })
    case types.UPLOAD_PORTFOLIO_FAILED:
      return produce(state, (draft) => {
        draft.uploadPortfolioRes.data = {}
        draft.uploadPortfolioRes.error = action.error
      })
    case types.GET_UPLOAD_PORTFOLIO_LIST_SUCCESS:
      return produce(state, (draft) => {
        const userInfo = state.userInfo
        const yearEmissions =
          userInfo.year && userInfo.year.emissions
            ? userInfo.year.emissions
            : '2019'
        let result = []
        let response = action.res

        if (response && response.length > 0) {
          response.map((res) => {
            let coverageEmissions = 0
            let coverageFundamentals = 0
            let weightEmissions=0;
            if (res.coverage_emissions && res.coverage_emissions.length > 0) {
              res.coverage_emissions.map((emission) => {
                if (emission.year == yearEmissions) {
                  coverageEmissions = emission.coverage
                  weightEmissions = emission.weight_coverage
                }
              })
            }
            if (
              res.coverage_fundamentals &&
              res.coverage_fundamentals.length > 0
            ) {
              res.coverage_fundamentals.map((fundamental) => {
                if (fundamental.year == yearEmissions) {
                  coverageFundamentals = fundamental.coverage
                }
              })
            }
            result.push({
              name: res.name,
              portfolio_id: res.portfolio_id,
              version: res.version,
              coverageEmissions: coverageEmissions,
              coverageFundamentals: coverageFundamentals,
              date_created: res.date_created,
              coverageWeightEmissions:weightEmissions
            })
          })
        }
        draft.portfolioTableRes = result
      })
    case types.GET_UPLOAD_PORTFOLIO_LIST_FAILED:
      return produce(state, (draft) => {
        draft.portfolioTableRes = []
      })
    case types.CHANGE_EMAIL_SUCCESS:
      return produce(state, (draft) => {
        draft.changeEmailRes = ''
      })
    case types.SET_DOWNLOAD_PORTFOLIO:
      return produce(state, (draft) => {
        draft.selectedDownloadPort = action.res
      })
	  case types.SET_DOWNLOAD_TAGS:
		return produce(state, (draft) => {
			draft.selectedDownloadMenu = action.res
		  })
    case types.SET_EMISSIONS_SUCCESS:
      return produce(state, (draft) => {
        draft.filterItem.emission = 'Sc123'
        draft.tabValue = 0
        })
      case types.GET_FIX_RATE_SUCCESS:
        return produce(state, (draft) => {
          draft.currencyFixRate = action.res 
        })
      case types.GET_ACCESS_TOKEN:
        return produce(state, (draft) => {
          console.log("action>>",action.res)
          draft.currentUser.access_token = action.res.access_token 
        })
    default:
      return state
  }
}
