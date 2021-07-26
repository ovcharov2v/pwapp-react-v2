import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: {
    text: null,
    type: null
  }
}

const message = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message.text = action.payload.text
      state.message.type = action.payload.type
    },
    clearMessage(state, action) {
      state.message.text = ''
      state.message.type = ''
    }
  },
})

export const { setMessage, clearMessage } = message.actions
export default message.reducer