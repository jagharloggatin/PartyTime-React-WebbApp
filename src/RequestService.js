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

const getArrayRequest = async(endpoint, setLoadedData) => {
  await fetch(
    endpoint,
  ).then(response => {
    return response.json();
  }).then(data => {
    const meetups = [];

    for(const key in data){
      const meetup = {
        id:key,
        ...data[key]
      };
      meetups.push(meetup);
    }
    setLoadedData(meetups);
  });
  return setLoadedData;
}


module.exports = { postRequest, getRequest, putRequest };
