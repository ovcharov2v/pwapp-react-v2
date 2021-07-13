const url = 'http://193.124.114.46:3001'

const api = {
  loginUrl: `${url}/sessions/create`,
  registerUrl: `${url}/users`,
  userInfoUrl: `${url}/api/protected/user-info`,
}

export default api