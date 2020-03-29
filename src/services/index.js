const axios = require('axios');

const get = (url) => axios(url).then((res) => res.data);

// https://svc.metrotransit.org/nextrip
const buildUrl = (pathname) => {
  return `https://svc.metrotransit.org/NexTrip${pathname}?format=json`;
};

exports.fetchRoutes = () => {
  return get(buildUrl('/Routes'));
};

exports.fetchDirections = (route) => {
  return get(buildUrl(`/Directions/${route}`));
};

exports.fetchStops = (route, direction) => {
  return get(buildUrl(`/Stops/${route}/${direction}`));
};

exports.fetchDepartures = (route, direction, stop) => {
  return get(buildUrl(`/${route}/${direction}/${stop}`));
};
