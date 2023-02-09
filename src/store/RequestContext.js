import React, { createContext, useContext } from 'react';
import StorageContext from './StorageContext';

//Refrenace methods to be shown in intellisense
const RequestContext = createContext({
    postRequest: null,
    putRequest: null,
    getRequest: null
});

export function RequestContextProvider(props) {
    const StorageCtx = useContext(StorageContext);
    
    async function postRequest(endpoint, body) {
        const response = await fetch(endpoint, {
            method: 'post',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(body)
        })

       return response;
    }

    async function putRequest(endpoint, body) {
        await fetch(endpoint, {
            method: 'put',
            headers: new Headers({ 'content-type': 'application/json', 'Authorization': `Bearer ${StorageCtx.ReadJWT().jwt}` }),
            body: JSON.stringify(body)
        })
    }

    async function getRequest(endpoint) {
        return await fetch(endpoint)
    }


  //Reference methods in this object to be passed as value
  const context = {
    postRequest: postRequest,
    putRequest: putRequest,
    getRequest: getRequest
  };

  return <RequestContext.Provider value={context}>{props.children}</RequestContext.Provider>;
}

export default RequestContext;
