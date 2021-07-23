import endpointList from './env'

export const getUserListFetch = (token, filter) => {
  return fetch(endpointList.userListUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({
      filter: filter
    })
  })
}