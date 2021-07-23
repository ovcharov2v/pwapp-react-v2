export const emailValidator = (value) => {
  let emailError = ''

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (value.length === 0) {
    emailError = 'Email is required'
  }
  else if (!re.test(String(value).toLowerCase())) {
    emailError = `Enter correct email address`
  }

  if (emailError.length > 0) {
    return emailError
  }

  return ''
}