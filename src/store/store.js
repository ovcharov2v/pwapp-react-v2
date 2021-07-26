import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/user'
import authReducer from './slices/auth'
import transactionReducer from './slices/transaction'
import messageReducer from './slices/message'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    transaction: transactionReducer,
    message: messageReducer,
  }
})

export default store