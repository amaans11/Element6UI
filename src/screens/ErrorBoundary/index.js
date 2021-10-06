import { Button } from '@material-ui/core';
import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
          error: error,
          errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
      }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <React.Fragment>
            <h3>Sorry, something went wrong.
                Please try to login again. If you still see this message please 
                let us know by emailing technical-support@urgentem.net</h3>
        </React.Fragment>;
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary