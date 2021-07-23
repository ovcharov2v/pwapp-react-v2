import endpointList from './env'

export const createTransactionFetch = (token, name, amount) => {
  return fetch(endpointList.transactionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({
      name: name,
      amount: amount,
    })
  })
}