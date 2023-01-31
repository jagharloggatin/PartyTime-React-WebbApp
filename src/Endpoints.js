const HOST = 'localhost';
const PORT = 7215;
const ENDPOINTS = {
  login: `https://${HOST}:${PORT}/auth/login`,
  register: `https://${HOST}:${PORT}/user`,
  checkUsername: (un) => `https://${HOST}:${PORT}/check/username/${un}`,
};

export default ENDPOINTS;
