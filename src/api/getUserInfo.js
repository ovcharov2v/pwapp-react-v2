import endpointList from './env'

export const getUserInfoFetch = (token) => {
  return fetch(endpointList.userInfoUrl, {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
}