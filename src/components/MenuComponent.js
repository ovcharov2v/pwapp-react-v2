import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import UserContext from '../context'
import { NavLink } from 'react-router-dom'
import { Typography, Link, AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import LeftMenu from './LeftMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(8),
  },
  title: {
    flexGrow: 1,
  },
  menuLink: {
    marginLeft: theme.spacing(2),
  },
  menuLinkActive: {
    textDecoration: 'underline'
  },
}));

const MenuComponent = () => {
  const classes = useStyles()
  const { user, setUser } = useContext(UserContext)
  const [leftMenuOpen, setLeftMenuOpen] = React.useState(false);  

  const toggleLeftMenu = () => {
    setLeftMenuOpen(!leftMenuOpen)
  }

  const logout = (e) => {
    e.preventDefault()
    setLeftMenuOpen(false)
    setUser({
      isLoggedIn: false,
      id: null,
      userName: null,
      email: null,
      balance: null,
      token: null,
    })
    localStorage.removeItem('token')
  }

  const MenuLink = ({text, link}) => {
    return (
      <Link
        component={NavLink}
        color="inherit"
        className={classes.menuLink}
        to={link}
        activeClassName={classes.menuLinkActive}
      >
        {text}
      </Link>
    )
  }

  const AuthMenu = () => {
    const classes = useStyles()
    return (
      <React.Fragment>
        <MenuLink text="Login" link="/login" />
        <MenuLink text="Register" link="/register" />
      </React.Fragment>
    )
  }

  const UserMenu = () => {
    const classes = useStyles()
    return (
      <React.Fragment>
        <p>Hi {user.userName}, you have {user.balance} PW</p>
        <Link
          color="inherit"
          className={classes.menuLink}
          href="#"
          onClick={logout}
        >
          Logout
        </Link>
      </React.Fragment>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {user.isLoggedIn &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleLeftMenu}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          }
          <Typography variant="h6" className={classes.title}>
            PWApp
          </Typography>
          {user.isLoggedIn
            ? <UserMenu />
            : <AuthMenu />
          }
        </Toolbar>
      </AppBar>
      <LeftMenu 
        leftMenuOpen={leftMenuOpen}
        toggleLeftMenu={toggleLeftMenu}
      />
    </div>
  );
}

export default MenuComponent;
