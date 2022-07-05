import mixpanel from 'mixpanel-browser';

if (process.env.NODE_ENV=='development') {
  mixpanel.init('52a462874f2da46e3662a534c36151d5', {debug: true});
} else {
  mixpanel.init('52a462874f2da46e3662a534c36151d5');
}

export default mixpanel;
