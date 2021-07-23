export const repasswordValidator = (value, eqvalue) => {
    const repasswordLength = value.length
    let repasswordError = '';

    if (repasswordLength === 0) {
      repasswordError = 'You must enter the password again'
    }
    else if (value !== eqvalue) {
      repasswordError = 'Passwords don\'t match'
    }

    if (repasswordError.length > 0) {
      return repasswordError
    }    

    return ''
  }