import React,{Component} from 'react';
import * as Sentry from '@sentry/browser';
import { connect } from 'react-redux';
import { configureStore } from '../../redux/store'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
      const {store,persistor} = configureStore();
      const user = this.props.user
      this.setState({ error });


      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
    }

    render() {
      const client = this.props.user.client
      const userName = this.props.user.userName
      const {filterItem} = this.props
      const {sector,footprintMetric,marketValue,assetClass,inferenceType,emission} = filterItem

      Sentry.setTag("client", client);
      Sentry.setTag("user-name", userName);
      Sentry.setTag("sector", sector);
      Sentry.setTag("footprint-metric", footprintMetric);
      Sentry.setTag("market-value", marketValue);
      Sentry.setTag("asset-class", assetClass.toString());
      Sentry.setTag("inference-type", inferenceType);
      Sentry.setTag("emission", emission);

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
const mapStateToProps = state=>{
  return {
    user:state.auth.currentUser,
    filterItem:state.auth.filterItem
  }
}
export default connect(mapStateToProps,null)(ErrorBoundary)