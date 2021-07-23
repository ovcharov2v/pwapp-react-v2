import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userLoginFetch } from '../../api/userLogin'
import { userRegisterFetch } from '../../api/userRegister'
import jwt_decode from 'jwt-decode'

const initialState = {
  error: null,
  token: null,
}

export const login = createAsyncThunk('auth/login',
  async (dispatch, data) => {
    try {
      const response = await userLoginFetch(dispatch.email, dispatch.password)
      if (response.ok) {
        const res = await response.json()
        data.dispatch(setToken(res.id_token))
      }
      else {
        const res = await response.text()
        data.dispatch(setError(res))
      }
    }
    catch (error) {
      throw Error(error)
    }
  }
)

export const register = createAsyncThunk('auth/register',
  async (dispatch, data) => {
    try {
      const response = await userRegisterFetch(dispatch.name, dispatch.email, dispatch.password)
      if (response.ok) {
        const res = await response.json()
        data.dispatch(setToken(res.id_token))
      }
      else {
        const res = await response.text()
        data.dispatch(setError(res))
      }
    }
    catch (error) {
      throw Error(error)
    }
  }
)

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state, action) {
      state.error = ''
    },
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
    autoLogin(state, action) {
      const token = localStorage.getItem('token')
      if (token && jwt_decode(token).exp < Date.now() * 1000) {
        state.token = token
      }
    },
    logout(state, action) {
      state.error = null
      state.token = null
      localStorage.removeItem('token')
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.token = action.payload.id_token
      localStorage.setItem('token', action.payload.id_token)
    },
  },
})

export const { setError, clearError, logout, autoLogin, setToken } = auth.actions
export default auth.reducer