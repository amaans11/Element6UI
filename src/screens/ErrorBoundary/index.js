import React,{Component} from 'react';
import * as Sentry from '@sentry/browser';
import { connect } from 'react-redux';
import {get} from 'lodash'
import { configureStore } from '../../redux/store'

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
      let client=null;
      let userName = null;
      let sector = null;
      let footprintMetric = null;
      let marketValue = null;
      let assetClass = null;
      let inferenceType = null;
      let emission = null;
      let portScenario = null;
      let targetScenario = null;
      let approach = null;
      let alignmentYear = null;
      let warmingScenario = null;

      const {user,filterItem} = this.props;

      console.log("filterItem",filterItem)
      if(user && Object.keys(user).length > 0){
        client = get(this.props.user,'client',null)
        userName = get(this.props.user,'userName',null)
      }
      if(filterItem && Object.keys(filterItem).length > 0){
        sector = filterItem['sector']
        footprintMetric = filterItem['footprintMetric']
        marketValue = filterItem['marketValue']
        assetClass = filterItem['assetClass']
        inferenceType = filterItem['inferenceType']
        emission = filterItem['emission']
        portScenario = filterItem['portScenario']
        targetScenario = filterItem['targetScenario']
        warmingScenario = filterItem['warmingScenario']
        approach = filterItem['approach']
        alignmentYear = filterItem['alignmentYear']
      }
         

      Sentry.setTag("client", client);
      Sentry.setTag("user-name", userName);
      Sentry.setTag("sector", sector);
      Sentry.setTag("footprint-metric", footprintMetric);
      Sentry.setTag("market-value", marketValue);
      Sentry.setTag("asset-class", assetClass && assetClass.length > 0 && assetClass.toString());
      Sentry.setTag("inference-type", inferenceType);
      Sentry.setTag("emission", emission);

      if(window.location.pathname === '/forward-looking-analysis'){
        Sentry.setTag("scenario", portScenario);
        Sentry.setTag("Target Scenario", targetScenario);
        Sentry.setTag("Warming Scenario", warmingScenario);
        Sentry.setTag("Approach", approach);
        Sentry.setTag("Alignment Year", alignmentYear);
      }

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