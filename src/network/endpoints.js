// Only the endpoints this project actually needs.
// Add more here as the app grows — same shape: { endpoint, method }.
export const endpoints = {
  login: {
    endpoint: '/login',
    method: 'POST',
  },
  eventListing: {
    endpoint: '/events-listing',
    method: 'POST',
  },
};
