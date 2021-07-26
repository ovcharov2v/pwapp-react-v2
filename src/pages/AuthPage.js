import React, { useState, useMemo } from 'react'
import WrapForm from '../components/hoc/WrapForm'
import { Box, Button, TextField, Divider } from '@material-ui/core/'
import Alert from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import {login, register} from '../store/slices/auth'
import { validate } from '../validators'
import WrapPage from '../components/hoc/WrapPage'
import {clearMessage} from '../store/slices/message'

const AuthPage = ({classes}) => { 
  const dispatch = useDispatch()
  const message = useSelector(state=>state.message.message)

  const defaultFormState = {
    mode: 'login',
    name: {
      value: '',
      error: '',
    },
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
    repassword: {
      value: '',
      error: '',
    },
  }

  const [formState, setFormState] = useState(defaultFormState)  

  const canSubmit = useMemo(()=>{
    if(formState.mode === 'login') {
      return formState.email.value.length > 0
              && formState.password.value.length > 0
              && formState.email.error.length === 0 
              && formState.password.error.length === 0
    }
    else {
      return formState.email.value.length > 0
              && formState.password.value.length > 0
              && formState.name.value.length > 0
              && formState.repassword.value.length > 0 
              && formState.email.error.length === 0 
              && formState.password.error.length === 0
              && formState.name.error.length === 0
              && formState.repassword.error.length === 0
    }
  }, [formState])

  const handleChange = (e) => {
    const newState = {
      ...formState
    }
    newState[e.target.name].value = e.target.value
    newState[e.target.name].error = ''
    setFormState({ ...newState })
    dispatch(clearMessage())
  }

  const handleValidation = (target, type) => {
    const newState = {
      ...formState
    }    
    const values = [target.value]
    if(type=='repassword') {
      values.push(formState.password.value)
    }
    newState[target.name].error = validate(values, type)
    setFormState({ ...newState })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    if(formState.mode === 'login') {
      result = dispatch(login({
        email: formState.email.value, 
        password: formState.password.value,
      }))
    }
    else {
      result = dispatch(register({
        name: formState.name.value,
        email: formState.email.value, 
        password: formState.password.value,
      }))
    }
  }

  const toggleFormMode = () => {
    const mode = formState.mode === 'login' ? 'register' : 'login'
    setFormState({...formState, mode: mode})    
    dispatch(clearMessage())
  }
  
  return (
    <Box className={classes.root}>
      <h1 className={classes.header}>{formState.mode}</h1>
      {message.text &&
        <Alert severity={message.type} className={classes.alert}>{message.text}</Alert>
      }
      <form
        className={classes.form}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {formState.mode==='register' &&
          <TextField
            name="name"
            className={classes.input}
            label="User name"
            type="text"
            error={formState.name.error.length > 0}
            helperText={formState.name.error}
            onChange={handleChange}
            onBlur={(e)=>{handleValidation(e.target, 'name')}}
          />
        }
        <TextField
          name="email"
          className={classes.input}
          label="Email"
          type="email"
          error={formState.email.error.length > 0}
          helperText={formState.email.error}
          onChange={handleChange}
          onBlur={(e)=>{handleValidation(e.target, 'email')}}
        />
        <TextField        
          name="password"
          className={classes.input}
          label="Password"
          type="password"
          error={formState.password.error.length > 0}
          helperText={formState.password.error}
          onChange={handleChange}
          onBlur={(e)=>{handleValidation(e.target, 'password')}}
        />
        {formState.mode==='register' &&
          <TextField            
            name="repassword"
            className={classes.input}
            label="Repeat password"
            type="password"
            error={formState.repassword.error.length > 0}
            helperText={formState.repassword.error}
            onChange={handleChange}
            onBlur={(e)=>{handleValidation(e.target, 'repassword')}}
          />
        }
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!canSubmit}
        >
          {formState.mode}
        </Button>
      </form>
      <Divider className={classes.divider}/>
      <Button
          color="primary"
          type="button"
          onClick={toggleFormMode}
          className={classes.toggleModeBtn}
      >
        {formState.mode==='login' &&
          <>Register new account</> 
        }
        {formState.mode==='register' &&
          <>Already have account</> 
        }
      </Button>
      
    </Box>
  );
}

export default WrapPage(WrapForm(AuthPage))