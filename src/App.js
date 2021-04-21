import React from 'react';
import Highcharts from "highcharts";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import { PersistGate } from 'redux-persist/es/integration/react';
import './App.css';
// import AuthenticatedRoute from './layouts/AuthenticatedRoute'
import { configureStore } from './redux/store';
import Login from './screens/auth/Login';
import Base from './layouts/Base';
import Settings from './screens/Settings';

// React notifications css import
import 'react-notifications/lib/notifications.css';
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/heatmap")(Highcharts);
require('highcharts/modules/export-data')(Highcharts)


const { store, persistor } = configureStore();

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['x-api-key'] = '_yF0FT6hgogJxSF1G0sAl3d9d4pQwxhuiRSS8FxAWb8';
axios.defaults.headers.get['x-api-key'] = '_yF0FT6hgogJxSF1G0sAl3d9d4pQwxhuiRSS8FxAWb8';

const currentTheme = localStorage.getItem("appTheme") || "basic";

Highcharts.theme = {
	colors: [
	"#597ef7",
	  "#bae637",
	  "#1890ff",
	  "#ff4d4f",
	  "#FFB74D"
	],
	chart: {
	  backgroundColor: currentTheme == 'dark' ? '#303030' : '#f5f5f5'
	},
	title: {
	  style: {
		color:  currentTheme == 'dark' ? '#f5f5f5' : '#303030',
		font: 'bold 22px "Trebuchet MS", Verdana, sans-serif',
	  },
	},
	subtitle: {
	  style: {
		color: "#666666",
		font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
	  },
	},
	legend: {
	  itemStyle: {
		font: "9pt Trebuchet MS, Verdana, sans-serif",
		color: "black",
	  },
	  itemHoverStyle: {
		color: "gray",
	  },
	},
	lang: {
		numericSymbols: null,
		thousandsSep: ','
	}
  };

function App() {
	Highcharts.setOptions(Highcharts.theme);

	return (
		<Provider store={store}>
				<PersistGate persistor={persistor}>
					<BrowserRouter>
						<div className="App">
							<Switch>
								<Route exact path="/login" component={Login} />
								<Route path="/settings" exact component={Settings} />
								<Route path="/"  component={Base} />
							</Switch>
						</div>
					</BrowserRouter>
					<NotificationContainer />
				</PersistGate>
		</Provider>
	);
}

export default App;
