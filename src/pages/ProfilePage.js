
import React, { useContext, useEffect } from 'react';
import UserContext from '../context'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core/'

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
}));

const ProfilePage = ({ getUserInfo }) => {
  const { user, setUser } = useContext(UserContext)
  const classes = useStyles()

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className="container">
      <Box className={classes.root}>
        <h1>Profile page</h1>
        <p className={classes.row}><strong>Id:</strong> {user.id}</p>
        <p className={classes.row}><strong>User name:</strong> {user.userName}</p>
        <p className={classes.row}><strong>Email:</strong> {user.email}</p>
        <p className={classes.row}><strong>Balance:</strong> {user.balance}</p>
      </Box>      
    </div>
  );
}

export default ProfilePage;