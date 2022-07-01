import React from 'react'
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

ReactGA.initialize('G-859BL121MP');

const GoogleAnalyticsTracker = ({ location }) => {

  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);

  return null;
};

export default withRouter(GoogleAnalyticsTracker);
