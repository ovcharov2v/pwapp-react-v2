const url = 'http://193.124.114.46:3001'

const api = {
  loginUrl: `${url}/sessions/create`,
  registerUrl: `${url}/users`,
  userInfoUrl: `${url}/api/protected/user-info`,
  transactionListUrl: `${url}/api/protected/transactions`,
  transactionUrl: `${url}/api/protected/transactions`,
  userListUrl: `${url}/api/protected/users/list`,
}

export default api