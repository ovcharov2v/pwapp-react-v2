import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, TextField } from '@material-ui/core/'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert'
import api from '../api'
import UserContext from '../context'
import queryString from 'query-string';

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

const TransactionPage = ({location}) => {  
  const classes = useStyles()
  const { user, setUser } = useContext(UserContext)

  const [isSuccess, setIsSuccess] = useState(false)
  const [userList, setUserList] = useState([])
  const defaultFormState = {
    responseMessage: '',
    name: {
      value: '',
      error: ''
    },
    amount: {
      value: '',
      error: ''
    }
  }
  const [formState, setFormState] = useState(defaultFormState)  

  useEffect(() => {
    if(location.search.length > 0) {      
      const parsed = queryString.parse(location.search);
      const newState = {
        ...formState
      }
      newState.name.value = parsed.name
      newState.amount.value = parsed.amount
      setFormState({ ...newState })
    }
  }, [])

  const getUsers = (e) => {
    const str = e.target.value
    fetch(api.userListUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify({
        filter: str
      })
    }).then((res) => {
      if (res.ok) {
        res.json().then((json)=>{          
          setUserList(json)
        })
      }
      else {
        res.text().then((text) => {
          console.log(`Error: ${text}`)
        })
      }
    })
  }

  const handleChange = (e) => {
    const newState = {
      ...formState
    }
    newState[e.target.name].value = e.target.value.trim()
    newState[e.target.name].error = ''
    newState.responseMessage = ''
    setFormState({ ...newState })
  }

  const validateName = () => {
    const name = formState.name.value
    let nameError = '';

    if (name.length === 0) {
      nameError = 'User name is required'
    }

    if (nameError.length > 0) {
      const newState = {
        ...formState
      }
      newState.name.error = nameError
      setFormState({ ...newState })
    }
  }

  const validateAmount = () => {
    const amount = formState.amount.value
    let amountError = '';

    if (amount.length === 0) {
      amountError = 'Amount is required'
    }
    else if (amount < 1) {
      amountError = 'Wrong amount value'
    }
    else if (amount > user.balance) {
      amountError = 'You haven\'t anough PW'
    }

    if (amountError.length > 0) {
      const newState = {
        ...formState
      }
      newState.amount.error = amountError
      setFormState({ ...newState })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(api.transactionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify({
        name: formState.name.value,
        amount: formState.amount.value,
      })
    }).then((res) => {
      if (res.ok) {
        res.json().then((json)=>{
          setFormState(defaultFormState)
          setIsSuccess(true)
          setTimeout(() => {
            setIsSuccess(false)            
          }, 4000);
        })
      }
      else {
        res.text().then((text) => {
          setFormState({...formState, responseMessage: `Error: ${text}`})
        })
      }
    })    
  }

  return ( 
    <div className="container">
      <Box className={classes.root}>
        <h1>New transaction</h1>
        <Box color="error.main" className={classes.responseError}>          
          {formState.responseMessage}
        </Box>
        {isSuccess &&
          <Alert severity="success">Success!</Alert>
        }
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >          
          <Autocomplete
            freeSolo
            options={userList.map((user) => user.name)}
            onChange={(event, newValue) => {
              const newState = {
                ...formState
              }
              newState.name.value = newValue
              newState.name.error = ''
              newState.responseMessage = ''
              setFormState({ ...newState })
            }}
            inputValue={formState.name.value}
            renderInput={(params) => (
              <TextField 
                name="name"
                {...params} 
                label="User name" 
                className={classes.input}
                error={formState.name.error.length > 0}
                helperText={formState.name.error}
                onChange={(e)=>{
                  handleChange(e)
                  getUsers(e)
                }}
                onBlur={validateName}        
              />
            )}
          />
          <TextField
            name="amount"
            className={classes.input}
            label="Amount"
            type="number"
            error={formState.amount.error.length > 0}
            helperText={formState.amount.error}
            onChange={handleChange}
            onBlur={validateAmount}
            value={formState.amount.value}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={formState.name.value.length === 0 || formState.name.value.length === 0 || formState.amount.error.length > 0 || formState.amount.error.length > 0}
          >
            Send PW
          </Button>
        </form>
      </Box>
    </div>
   );
}
 
export default TransactionPage;