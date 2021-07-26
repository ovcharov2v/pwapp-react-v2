import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button } from '@material-ui/core/'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {info} from '../store/slices/user'
import WrapPage from '../components/hoc/WrapPage'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    padding: theme.spacing(4),
    width: 300,
    border: '1px solid #eee',
    borderRadius: 16,
  },
  row: {
    marginBottom: theme.spacing(2),
  },
  links: {
    display: 'flex',
    margin: '0 -12px'
  },
  link: {
    flexGrow: 1,
    margin: '0 6px',
  }
}));

const ProfilePage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(info())
  }, [])  

  return (
    <Box className={classes.root}>
      <h1>Profile page</h1>
      <p className={classes.row}><strong>Id:</strong> {user.id}</p>
      <p className={classes.row}><strong>User name:</strong> {user.userName}</p>
      <p className={classes.row}><strong>Email:</strong> {user.email}</p>
      <p className={classes.row}><strong>Balance:</strong> {user.balance}</p>
      <div className={classes.links}>
        <Button 
          component={NavLink}
          color="primary"
          className={classes.link}
          to="transaction"
        >
          New transaction
        </Button>
        <Button 
          component={NavLink}
          color="primary"
          className={classes.link}
          to="history"
        >
          Transaction list
        </Button>
      </div>
    </Box>
  )
}

export default WrapPage(ProfilePage);