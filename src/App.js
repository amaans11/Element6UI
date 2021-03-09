import React from 'react';
import "./App.scss";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthenticatedRoute from './layouts/AuthenticatedRoute'
import configureStore from './redux/store';
import Login from './screens/auth/Login';
import Base from './layouts/Base'

const store=configureStore()

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            {/* <Route exact path="/login" component={Base} /> */}
            <Route path="/" component={Base} />
          </Switch>
        </div>
      </BrowserRouter>
  </Provider>
  );
}

export default App;
