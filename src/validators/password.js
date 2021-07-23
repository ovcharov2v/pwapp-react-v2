export const passwordValidator = (value) => {
  const passwordLength = value.length
  let passwordError = ''

  if (passwordLength === 0) {
    passwordError = 'Password is required'
  }
  else if (passwordLength < 4) {
    passwordError = `Min password length is 4, now - ${passwordLength}`
  }

  if (passwordError.length > 0) {
    return passwordError
  }

  return ''
}