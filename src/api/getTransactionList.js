import endpointList from './env'

export const getTransactionListFetch = (token) => {
  return fetch(endpointList.transactionListUrl, {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
}