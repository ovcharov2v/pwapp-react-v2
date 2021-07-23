import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/user'
import authReducer from './slices/auth'
import transactionReducer from './slices/transaction'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    transaction: transactionReducer
  }
})

export default store