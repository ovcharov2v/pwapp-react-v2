export const nameValidator =  (value) => {
  const nameLength = value.length
  let nameError = '';

  if (nameLength === 0) {
    nameError = 'Name is required'
  }
  else if (nameLength < 4) {
    nameError = `Min name length is 4, now - ${nameLength}`
  }

  if (nameError.length > 0) {
    return nameError
  }

  return ''
}