import React, { useState, useEffect } from 'react'
import { Box, Button, TextField } from '@material-ui/core/'
import api from '../api'
import AuthForm from '../components/hoc/AuthForm'

const RegisterPage = ({user, setUser, classes, formState, setFormState, handleChange, validatePassword, validateEmail}) => {  

  useEffect(() => {
    setFormState({
      ...formState,
      name: {
        value: '',
        error: ''
      },
      repassword: {
        value: '',
        error: ''
      }
    })
  }, []) 

  const validateName = (e) => {
    const nameLength = formState.name.value.length
    let nameError = '';

    if (nameLength === 0) {
      nameError = 'Name is required'
    }
    else if (nameLength < 4) {
      nameError = `Min name length is 4, now - ${nameLength}`
    }

    if (nameError.length > 0) {
      const newState = {
        ...formState
      }
      newState.name.error = nameError
      setFormState({ ...newState })
    }
  }  

  const validateRePassword = (e) => {
    const repasswordLength = formState.repassword.value.length
    let repasswordError = '';

    if (repasswordLength === 0) {
      repasswordError = 'You must enter the password again'
    }
    else if (formState.repassword.value !== formState.password.value) {
      repasswordError = 'Passwords don\'t match'
    }

    if (repasswordError.length > 0) {
      const newState = {
        ...formState
      }
      newState.repassword.error = repasswordError
      setFormState({ ...newState })
    }    
  }  

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(api.registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        'username': formState.email.value,
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
      <h1>Register page</h1>
      <Box color="error.main" className={classes.responseError}>          
        {formState.responseMessage}
      </Box>
      <form
        className={classes.form}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          name="name"
          className={classes.input}
          label="User name"
          type="text"
          error={formState.name && formState.name.error.length > 0}
          helperText={formState.name ? formState.name.error: ''}
          onChange={handleChange}
          onBlur={validateName}
        />
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
        <TextField
          name="repassword"
          className={classes.input}
          label="Repeat password"
          type="password"
          error={formState.repassword && formState.repassword.error.length > 0}
          helperText={formState.repassword ? formState.repassword.error: ''}
          onChange={handleChange}
          onBlur={validateRePassword}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={formState.email.value.length === 0 || formState.password.value.length === 0 || formState.email.error.length > 0 || formState.password.error.length > 0}
        >
          Register
        </Button>
      </form>
    </Box>
  );
}
 
export default AuthForm(RegisterPage);