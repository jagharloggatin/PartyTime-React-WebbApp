const HOST = 'localhost';
const PORT = 7215;
const URL = `https://${HOST}:${PORT}`;

const ENDPOINTS = {
  login: `https://${HOST}:${PORT}/auth/login`,
  register: `https://${HOST}:${PORT}/users`,
  checkUsername: (un) => `https://${HOST}:${PORT}/check/username/${un}`,
  
  getEvent: (id) => `https://${HOST}:${PORT}/events/${id}`,
  getEvents: `https://${HOST}:${PORT}/events`,
  getLocationEvents: (location, locationId) => `https://${HOST}:${PORT}/events/${location}/${locationId}`,
  postEvent: `https://${HOST}:${PORT}/events`,
  getUserReviews: (userId) => `https://${HOST}:${PORT}/reviews/${userId}`,
  putEvent: (id) => `https://${HOST}:${PORT}/events/${id}`,
  postReview: (id) => `https://${HOST}:${PORT}/reviews/${id}`,
  deleteEvent: (id) => `https://${HOST}:${PORT}/events/${id}`,
  // postFavorite: () => `https://${HOST}:${PORT}/favorites/:id`,
  getUser: (id) => `${URL}/users/${id}`,

  editUser: (id) => `${URL}/users/${id}`,
  changePassword: `${URL}/users/password`,
};

export default ENDPOINTS;
