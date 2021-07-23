import endpointList from './env'

export const userLoginFetch = (email, password) => {
  return fetch(endpointList.loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
}