import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUserListFetch } from '../../api/getUserList'
import { createTransactionFetch } from '../../api/createTransaction'
import { getTransactionListFetch } from '../../api/getTransactionList'

const initialState = {
  message: {
    text: null,
    type: null
  },
  name: null,
  amount: null,
  userList: [],
  transactionList: [],
}

export const getUserList = createAsyncThunk('transaction/getUserList',
  async (dispatch, data) => {
    const state = data.getState()
    if (dispatch.filter.length === 0) {
      return []
    }
    try {
      const response = await getUserListFetch(state.auth.token, dispatch.filter)
      if (response.ok) {
        const res = await response.json()
        return res
      }
      else {
        const res = await response.text()
        data.dispatch(setMessage({ text: res, type: 'error' }))
      }
    }
    catch (error) {
      throw Error(error)
    }
  }
)

export const newTransaction = createAsyncThunk('transaction/newTransaction',
  async (dispatch, data) => {
    const state = data.getState()
    try {
      const response = await createTransactionFetch(state.auth.token, dispatch.name, dispatch.amount)
      if (response.ok) {
        const res = await response.json()
        data.dispatch(setMessage({ text: `Successfully send ${Math.abs(res.trans_token.amount)}PW to ${res.trans_token.username}`, type: 'success' }))
        return res
      }
      else {
        const res = await response.text()
        data.dispatch(setMessage({ text: res, type: 'error' }))
      }
    }
    catch (error) {
      throw Error(error)
    }
  }
)

export const getTransactionList = createAsyncThunk('transaction/transactionList',
  async (dispatch, data) => {
    const state = data.getState()
    try {
      const response = await getTransactionListFetch(state.auth.token)
      if (response.ok) {
        const res = await response.json()
        return res
      }
      else {
        const res = await response.text()
        throw Error(res)
      }
    }
    catch (error) {
      throw Error(error)
    }
  }
)

const transaction = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message.text = action.payload.text
      state.message.type = action.payload.type
    },
    setTransactionData(state, action) {
      state.name = action.payload.name
      state.amount = action.payload.amount
    },
  },
  extraReducers: {
    [getUserList.fulfilled]: (state, action) => {
      state.userList = action.payload
    },
    [getUserList.rejected]: (state, action) => {
      state.userList = []
    },
    [getTransactionList.fulfilled]: (state, action) => {
      state.transactionList = action.payload.trans_token
    },
    [getTransactionList.rejected]: (state, action) => {
      state.transactionList = []
    },
  },
})

export const { setMessage, setTransactionData } = transaction.actions
export default transaction.reducer