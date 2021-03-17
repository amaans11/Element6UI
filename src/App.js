import React ,{useContext} from 'react';
import "./App.css";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import axios from 'axios'
import { Provider } from 'react-redux';
import {NotificationContainer} from 'react-notifications';
import { CustomThemeContext } from "./Themes/customThemeProvider";
// import AuthenticatedRoute from './layouts/AuthenticatedRoute'
import configureStore from './redux/store';
import Login from './screens/auth/Login';
import Base from './layouts/Base'
import Settings from './screens/Settings'


// React notifications css import
import 'react-notifications/lib/notifications.css';


const store=configureStore()

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['x-api-key'] = '_yF0FT6hgogJxSF1G0sAl3d9d4pQwxhuiRSS8FxAWb8';

function App() {
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === "dark");

  const handleThemeChange = (event) => {
    if (currentTheme === "basic") {
      setTheme("dark");
      setTheme("basic");
    }
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/" exact component={Base} />
            <Route path="/settings" exact component={Settings} />
          </Switch>
        </div>
      </BrowserRouter>
      <NotificationContainer/>
  </Provider>
  );
}

export default App;
