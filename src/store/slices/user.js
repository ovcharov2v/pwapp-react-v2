import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUserInfoFetch } from '../../api/getUserInfo'

const initialState = {
  id: null,
  userName: null,
  email: null,
  balance: null,
}

export const info = createAsyncThunk('user/info',
  async (dispatch, data) => {
    const state = data.getState()
    try {
      const response = await getUserInfoFetch(state.auth.token)
      if (response.ok) {
        const data = await response.json()
        return data
      }
      else {
        const data = await response.text()
        throw Error(data)
      }
    }
    catch (error) {
      throw Error(error)
    }
  }
)

const user = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [info.fulfilled]: (state, action) => {
      state.id = action.payload.user_info_token.id
      state.userName = action.payload.user_info_token.name
      state.email = action.payload.user_info_token.email
      state.balance = action.payload.user_info_token.balance
    },
  },
})

export default user.reducer