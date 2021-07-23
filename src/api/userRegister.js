import endpointList from './env'

export const userRegisterFetch = (name, email, password) => {
  return fetch(endpointList.registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      username: name,
      email: email,
      password: password
    })
  })
}