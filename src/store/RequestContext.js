import React, { createContext, useContext } from 'react';
import StorageContext from './StorageContext';
import UserContext from './UserContext';

//Refrenace methods to be shown in intellisense
const RequestContext = createContext({
  postRequest: null,
  putRequest: null,
  getRequest: null,
  convertResponse: null,
  getRequestJWT: null
});

export function RequestContextProvider(props) {
  const userCtx = useContext(UserContext);

  async function postRequest(endpoint, body) {
    const headers = { 'content-type': 'application/json' };

    if (userCtx.IsLoggedIn) headers.Authorization = `Bearer ${userCtx.ReadJWT().jwt}`;

    const response = await fetch(endpoint, {
      method: 'post',
      headers: new Headers(headers),
      body: JSON.stringify(body),
    });
    return response;
  }

  async function putRequest(endpoint, body) {
    const headers = { 'content-type': 'application/json' };
    if (userCtx.IsLoggedIn) headers.Authorization = `Bearer ${userCtx.ReadJWT().jwt}`;

    await fetch(endpoint, {
      method: 'put',
      headers: new Headers(headers),
      body: JSON.stringify(body),
    });
  }
  
  async function getRequest(endpoint) {
    return await fetch(endpoint);
  }

  async function getRequestJWT(endpoint) {
    const headers = { 'content-type': 'application/json' };
    if (userCtx.IsLoggedIn) headers.Authorization = `Bearer ${userCtx.ReadJWT().jwt}`;

    console.log(userCtx.ReadJWT().jwt);

    const newheaders = new Headers()
    newheaders.append('content-type', 'application/json')
    newheaders.append('Authorization', `Bearer ${userCtx.ReadJWT().jwt}`)

    const resp = await fetch(endpoint, {
      method: 'get',
      headers: new Headers(headers)
      }
    ) 

    return resp
  }

  async function convertResponse(response) {
    var json = await response.json();

    const list = [];

    for (const key in json) {
      const meetup = {
        id: key,
        ...json[key],
      };
      list.push(meetup);
    }
    return list;
  }

  //Reference methods in this object to be passed as value
  const context = {
    postRequest: postRequest,
    putRequest: putRequest,
    getRequest: getRequest,
    convertResponse: convertResponse,
    getRequestJWT: getRequestJWT
  };

  return <RequestContext.Provider value={context}>{props.children}</RequestContext.Provider>;
}

export default RequestContext;
