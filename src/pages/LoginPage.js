import React, { useState, useContext } from 'react'
import UserContext from '../context'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, TextField } from '@material-ui/core/'
import api from '../api'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    padding: theme.spacing(4),
    width: 300,
    border: '1px solid #eee',
    borderRadius: 16,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: theme.spacing(4),
  },
  responseError: {
    marginBottom: theme.spacing(4),
  }
}));


const LoginPage = () => {
  const { user, setUser } = useContext(UserContext)
  const classes = useStyles()

  const [formState, setFormState] = useState({
    responseMessage: '',
    email: {
      value: 'userx@test.com',
      error: ''
    },
    password: {
      value: '12341234',
      error: ''
    }
  })

  const handleChange = (e) => {
    const newState = {
      ...formState
    }
    newState[e.target.name].value = e.target.value.trim()
    newState[e.target.name].error = ''
    newState.responseMessage = ''
    setFormState({ ...newState })
  }

  const validatePassword = (e) => {
    const passwordLength = formState.password.value.length
    let passwordError = '';

    if (passwordLength === 0) {
      passwordError = 'Password is required'
    }
    else if (passwordLength < 4) {
      passwordError = `Min password length is 4, now - ${passwordLength}`
    }

    if (passwordError.length > 0) {
      const newState = {
        ...formState
      }
      newState.password.error = passwordError
      setFormState({ ...newState })
    }
  }

  const validateEmail = () => {
    let emailError = '';

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (formState.email.value.length === 0) {
      emailError = 'Email is required'
    }
    else if (!re.test(String(formState.email.value).toLowerCase())) {
      emailError = `Enter correct email address`
    }

    if (emailError.length > 0) {
      const newState = {
        ...formState
      }
      newState.email.error = emailError
      setFormState({ ...newState })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(api.loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        'email': formState.email.value,
        'password': formState.password.value
      })
    })
      .then((res) => {
        if (res.ok) {          
          res.json().then((json)=>{
            const newUser = { ...user }
            newUser.isLoggedIn = true
            newUser.token = json.id_token
            setUser({ ...newUser })         
          })          
        }
        else {
          res.text().then((text)=>{
            setFormState({...formState, responseMessage: `Error: ${text}`})
          })          
        }
      })
  }

  return (
    <div className="container">
      <Box className={classes.root}>
        <h1>Login page</h1>
        <Box color="error.main" className={classes.responseError}>          
          {formState.responseMessage}
        </Box>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            name="email"
            className={classes.input}
            label="Email"
            type="email"
            error={formState.email.error.length > 0}
            helperText={formState.email.error}
            onChange={handleChange}
            onBlur={validateEmail}
          />
          <TextField
            name="password"
            className={classes.input}
            label="Password"
            type="password"
            error={formState.password.error.length > 0}
            helperText={formState.password.error}
            onChange={handleChange}
            onBlur={validatePassword}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={formState.email.value.length === 0 || formState.password.value.length === 0 || formState.email.error.length > 0 || formState.password.error.length > 0}
          >
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default LoginPage;