import React from 'react'
import Highcharts from 'highcharts'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { Provider } from 'react-redux'
import { NotificationContainer } from 'react-notifications'
import more from 'highcharts/highcharts-more'
import { PersistGate } from 'redux-persist/es/integration/react'
import './App.css'
import AuthenticatedRoute from './layouts/AuthenticatedRoute'
import { configureStore } from './redux/store'
import Login from './screens/auth/Login'
import Base from './layouts/Base'
import Settings from './screens/Settings'
import UpdatePassword from './screens/UpdatePassword'
import VerificationCode from './screens/VerificationCode'
import Admin from './screens/Admin'
import { setLoading,getAccessToken, logoutUser,changePasswordRequest,updateVerificationCode,setLogin } from './redux/actions/authActions'
import * as actionTypes from './redux/actionTypes'
import ErrorBoundary from './screens/ErrorBoundary'

// React notifications css import
import 'react-notifications/lib/notifications.css'
import { NotificationManager } from 'react-notifications'

// Highcharts import
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/heatmap')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('dotenv').config()


more(Highcharts)

const { store, persistor } = configureStore()

// axios headers for all the APIs
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['x-api-key'] =
  '_yF0FT6hgogJxSF1G0sAl3d9d4pQwxhuiRSS8FxAWb8'
axios.defaults.headers.get['x-api-key'] =
  '_yF0FT6hgogJxSF1G0sAl3d9d4pQwxhuiRSS8FxAWb8'

const currentTheme = localStorage.getItem('appTheme') || 'basic'

Highcharts.theme = {
  colors:
    currentTheme === 'dark'
      ? [
          '#1bdecb',
          '#FF991F',
          '#C595FB',
          '#FF0000',
          '#b7efa3',
          '#0E77CA',
          '#77a1e5',
          '#c42525',
          '#a6c96a',
        ]
      : [
          '#1E2732',
          '#F7DC81',
          '#7d7551',
          '#31d6c9',
          '#bbbfbf',
          '#a0d911',
          '#36cfc9',
          '#40a9ff',
          '#f759ab',
          '#22075e',
        ],
  chart: {
    backgroundColor: currentTheme === 'dark' ? '#303030' : '#f5f5f5',
  },
  title: {
    style: {
      color: currentTheme === 'dark' ? '#f5f5f5' : '#303030',
      font: 'bold 18px "Trebuchet MS", Verdana, sans-serif',
    },
  },
  subtitle: {
    style: {
      color: '#666666',
      fontSize: 18,
      fontWeight: 'bold',
    },
  },
  legend: {
    itemStyle: {
      font: '9pt Trebuchet MS, Verdana, sans-serif',
      color: 'black',
    },
    itemHoverStyle: {
      color: 'gray',
    },
  },
  lang: {
    numericSymbols: null,
    thousandsSep: ',',
  },
}
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    console.log("test")

    // Do something before request is sent

    store.dispatch(setLoading(true))
    return config
  },
  function (error) {
    // Do something with  error
    return Promise.reject(error)
  },
)

// Add a response interceptor
axios.interceptors.response.use(
  async function (response) {
    if (response.config.url !== `${process.env.REACT_APP_API_URL}/portfolio/`) {
      store.dispatch(setLoading(false))
    }    
    return response
  },
  function (error) {
    if(error.response.status === 401 && error.response.data.type === 'refresh'){
      store.dispatch(getAccessToken())
    }
    if(error.response.status === 403 && error.response.data.type === 're_login' ){
      store.dispatch(logoutUser())
      NotificationManager.error("This login was blocked. Pls re-login again")
    }
    if(error.response.status === 403 && error.response.data.type === 'change_pwd' ){
      store.dispatch(changePasswordRequest())
      NotificationManager.error("Please change the password ! ")
    }
    if(error.response.status === 403 && error.response.data.type === 'verification_required' ){
      store.dispatch(updateVerificationCode())
    }
    store.dispatch(setLoading(false))
    return Promise.reject(error)
  },
)

function App() {
  Highcharts.setOptions(Highcharts.theme)

  const version = localStorage.getItem('version')

  if(!version){
    localStorage.setItem('version',0)
  }
  if(process.env.REACT_APP_VERSION != version){
    store.dispatch(setLogin())
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <div>
          <ErrorBoundary>
            <Switch>
              <Route exact path="/login" component={Login} />
              <AuthenticatedRoute path="/settings" exact component={Settings} />
              <AuthenticatedRoute path="/update-password" exact component={UpdatePassword} />
              <AuthenticatedRoute path="/verification-code" exact component={VerificationCode} />              <AuthenticatedRoute path="/admin" exact component={Admin} />
              <AuthenticatedRoute path="/" component={Base} />
            </Switch>
          </ErrorBoundary>
          </div>
        </BrowserRouter>
        <NotificationContainer />
      </PersistGate>
    </Provider>
  )
}

export default App
