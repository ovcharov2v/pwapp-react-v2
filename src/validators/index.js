import { nameValidator } from './name'
import { emailValidator } from './email'
import { passwordValidator } from './password'
import { repasswordValidator } from './repassword'
import { amountValidator } from './amount'

export const validate = (values, type) => {
  switch (type) {
    case 'name':
      return nameValidator(values[0])
    case 'email':
      return emailValidator(values[0])
    case 'password':
      return passwordValidator(values[0])
    case 'repassword':
      return repasswordValidator(values[0], values[1])
    case 'amount':
      return amountValidator(values[0], values[1])
    default:
      return ''
  }
}