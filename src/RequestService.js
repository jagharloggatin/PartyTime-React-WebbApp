const { useEffect, useState } = require('react');

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


// const getArrayRequest = async (endpoint) => {
//   const getData = async () => {
//     try {
//       let res = await fetch('https://testagain-d4b54-default-rtdb.firebaseio.com/meetups.json');
//       let json = await res.json();
//       return json;
//     } catch (e) {}
//   };
//   getData()
// }


module.exports = { postRequest, getRequest, putRequest };
