import React, {useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import UserContext from '../context'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(8),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuLink: {
    marginLeft: theme.spacing(2),
  }
}));

const AuthMenu = () => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Link
        component={RouterLink}
        color="inherit"
        className={classes.menuLink}
        to="login"
      >
        Login
      </Link>
      <Link
        component={RouterLink}
        color="inherit"
        className={classes.menuLink}
        to="register"
      >
        Register
      </Link>
    </React.Fragment>
  )
}

const UserMenu = () => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Link
        component={RouterLink}
        color="inherit"
        className={classes.menuLink}
        to="profile"
      >
        Profile
      </Link>
      <Link
        component={RouterLink}
        color="inherit"
        className={classes.menuLink}
        to="transaction"
      >
        New transaction
      </Link>
      <Link
        component={RouterLink}
        color="inherit"
        className={classes.menuLink}
        to="history"
      >
        Transaction list
      </Link>
    </React.Fragment>
  )
}

const MenuComponent = () => {
  const classes = useStyles()
  const {user, setUser} = useContext(UserContext)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            PWApp
          </Typography>
          {user.isLoggedIn
            ? <UserMenu />
            : <AuthMenu />
          }          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuComponent;
