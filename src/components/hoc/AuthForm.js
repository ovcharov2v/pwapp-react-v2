import React, { useState, useContext } from 'react'
import UserContext from '../../context'
import { makeStyles } from '@material-ui/core/styles'

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


const AuthForm = (Component) => {  

  const Auth = () => {    
    const { user, setUser } = useContext(UserContext)
    const classes = useStyles()

    const [formState, setFormState] = useState({
      responseMessage: '',
      email: {
        value: '',
        error: ''
      },
      password: {
        value: '',
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

    return (
      <Component 
        user={user}
        setUser={setUser}
        classes={classes}
        formState={formState}
        setFormState={setFormState}
        handleChange={handleChange}
        validatePassword={validatePassword}
        validateEmail={validateEmail}
      />    
    );
  }

  return Auth
}

export default AuthForm;