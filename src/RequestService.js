const postRequest = async (endpoint, body) =>
  await fetch(endpoint, {
    method: 'post',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify(body),
  });

const putRequest = async (endpoint, body) =>
  await fetch(endpoint, {
    method: 'put',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify(body),
  });

const getRequest = async (endpoint) => await fetch(endpoint);

module.exports = { postRequest, getRequest, putRequest };
