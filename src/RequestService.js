const postRequest = async (endpoint, body) =>
  await fetch(endpoint, {
    method: 'post',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify(body),
  });

module.exports = { postRequest };
