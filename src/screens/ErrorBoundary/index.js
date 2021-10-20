import React,{Component} from 'react';
import * as Sentry from '@sentry/browser';
// Sentry.init({
//  dsn: "<https://63bbb258ca4346139ee533576e17ac46@sentry.io/1432138>"
// });
// should have been called before using it here
// ideally before even rendering your react app 

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
      this.setState({ error });
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
              <h3>Sorry, something went wrong.
                Please try to <a href="/login"> login again </a>. If you still see this message please 
                let us know by emailing technical-support@urgentem.net</h3>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}
export default ErrorBoundary