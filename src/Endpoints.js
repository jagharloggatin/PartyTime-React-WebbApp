const HOST = 'localhost';
const PORT = 7215;
const URL = `https://${HOST}:${PORT}`;

const ENDPOINTS = {
  login: `https://${HOST}:${PORT}/auth/login`,
  register: `https://${HOST}:${PORT}/user`,
  checkUsername: (un) => `https://${HOST}:${PORT}/check/username/${un}`,
  getUser: (id) => `${URL}/users/${id}`,
  editUser: (id) => `${URL}/users/${id}`,
};

export default ENDPOINTS;
