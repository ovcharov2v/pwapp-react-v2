import React, { useState, useMemo } from 'react'
import WrapForm from '../components/hoc/WrapForm'
import { Box, Button, TextField } from '@material-ui/core/'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList, newTransaction } from '../store/slices/transaction'
import { validate } from '../validators/'



const TransactionPage = ({classes}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const transaction = useSelector((state) => state.transaction)

  const defaultFormState = {
    name: {
      value: transaction.name || '',
      error: ''
    },
    amount: {
      value: '' + transaction.amount || '',
      error: ''
    }
  }
  const [formState, setFormState] = useState(defaultFormState)

  const canSubmit = useMemo(() => {
    return formState.name.value.length > 0
      && formState.amount.value.length > 0
      && formState.name.error.length === 0
      && formState.amount.error.length === 0
  }, [formState])

  const handleChange = (e) => {
    const newState = {
      ...formState
    }
    newState[e.target.name].value = e.target.value.trim()
    newState[e.target.name].error = ''
    newState.errorMessage = ''
    setFormState({ ...newState })
  }

  const handleValidation = (target, type) => {
    const newState = {
      ...formState
    }
    const values = [target.value]
    if (type == 'amount') {
      values.push(user.balance)
    }
    newState[target.name].error = validate(values, type)
    setFormState({ ...newState })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = dispatch(newTransaction({
      name: formState.name.value,
      amount: formState.amount.value
    }))
    result.then((res) => {
      if (res.payload) {
        const newState = {
          ...formState
        }        
        newState.name.value = ''
        newState.amount.value = ''
        setFormState({ ...newState })
      }
    })
  }

  return (
    <div className="container">
      <Box className={classes.root}>
        <h1>New transaction</h1>
        {transaction.message.text &&
          <Alert severity={transaction.message.type} className={classes.alert}>{transaction.message.text}</Alert>
        }
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Autocomplete
            freeSolo
            options={transaction.userList.map((user) => user.name)}
            onChange={(event, newValue) => {
              const newState = {
                ...formState
              }
              newState.name.value = newValue
              newState.name.error = ''
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
                onChange={(e) => {
                  handleChange(e)
                  dispatch(getUserList({ filter: e.target.value }))
                }}
                onBlur={(e) => handleValidation(e.target, 'name')}
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
            onBlur={(e) => handleValidation(e.target, 'amount')}
            value={formState.amount.value}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!canSubmit}
          >
            Send PW
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default WrapForm(TransactionPage);