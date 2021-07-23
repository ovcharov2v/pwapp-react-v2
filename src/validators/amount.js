export const amountValidator =  (value, balance) => {  
  let amountError = '';

  if (value.length === 0) {
    amountError = 'Amount is required'
  }
  else if (value < 1) {
    amountError = 'Wrong amount value'
  }
  else if (value > balance) {
    amountError = 'You haven\'t anough PW'
  }

  if (amountError.length > 0) {
    return amountError
  }

  return ''
}