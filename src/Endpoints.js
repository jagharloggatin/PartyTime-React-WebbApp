
const HOST = 'localhost';
const PORT = 7215;
const URL = `https://${HOST}:${PORT}`;

const ENDPOINTS = {
  login: `https://${HOST}:${PORT}/auth/login`,
  register: `https://${HOST}:${PORT}/user`,
  events: `https://${HOST}:${PORT}/events`,
  checkUsername: (un) => `https://${HOST}:${PORT}/check/username/${un}`,
  getEvents: () => `https://${HOST}:${PORT}/events`,
  getLocationEvents: (location, locationId) => `https://${HOST}:${PORT}/events/${location}/${locationId}`,
  postEvent: () => `https://${HOST}:${PORT}/events`,
  getUserReviews: (userId) => `https://${HOST}:${PORT}/events/reviews/${userId}`,
  putEvent: (id) => `https://${HOST}:${PORT}/events/${id}`,
  postReview: (eventId) => `https://${HOST}:${PORT}/reviews/${eventId}`,
  deleteEvent: (id) => `https://${HOST}:${PORT}/events/${id}`,
  // postFavorite: () => `https://${HOST}:${PORT}/favorites/:id`,
  getUser: (id) => `${URL}/users/userId/${id}`,

  editUser: (id) => `${URL}/users/${id}`,
  changePassword: `${URL}/users/password`,
};

export default ENDPOINTS;
