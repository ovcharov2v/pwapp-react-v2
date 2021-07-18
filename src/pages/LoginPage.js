import React from 'react'
import { Box, Button, TextField } from '@material-ui/core/'
import api from '../api'
import AuthForm from '../components/hoc/AuthForm'

const LoginPage = ({user, setUser, classes, formState, setFormState, handleChange, validatePassword, validateEmail}) => {  

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
            localStorage.setItem('token', json.id_token)       
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
  );
}

export default AuthForm(LoginPage);