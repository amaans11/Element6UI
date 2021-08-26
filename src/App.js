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
import Admin from './screens/Admin'
import { setLoading } from './redux/actions/authActions'
import * as actionTypes from './redux/actionTypes'

// React notifications css import
import 'react-notifications/lib/notifications.css'

// Highcharts import
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/heatmap')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)

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
          '#FF8000',
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
  exporting: {
    buttons: {
      contextButton: {
        menuItems: [
          'printChart',
          'separator',
          'downloadPNG',
          'downloadJPEG',
          'downloadPDF',
          'downloadSVG',
          'separator',
          'downloadCSV',
          'downloadXLS',
          'openInCloud',
        ],
      },
    },
  },
}
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
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
    if (response.config.url !== `${actionTypes.API_URL}/portfolio/`) {
      store.dispatch(setLoading(false))
    }
    return response
  },
  function (error) {
    store.dispatch(setLoading(false))
    return Promise.reject(error)
  },
)

function App() {
  Highcharts.setOptions(Highcharts.theme)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/login" component={Login} />
              <AuthenticatedRoute path="/settings" exact component={Settings} />
              <AuthenticatedRoute path="/admin" exact component={Admin} />
              <AuthenticatedRoute path="/" component={Base} />
            </Switch>
          </div>
        </BrowserRouter>
        <NotificationContainer />
      </PersistGate>
    </Provider>
  )
}

export default App
