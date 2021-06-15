import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import {configureStore} from '../redux/store';

const {store} = configureStore();

function AuthenticatedRoute({ component: SubComp, authenticated, ...rest }) {
    const currentUser = store.getState().auth.currentUser;
    
    return (
      <Route
        {...rest}
        render={props =>
          currentUser && Object.keys(currentUser).length > 0 ? (
            <SubComp {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  export default AuthenticatedRoute;