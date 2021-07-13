import React, {useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import UserContext from '../context'
import { Link as RouterLink } from 'react-router-dom'
import { Drawer, Typography, Link, AppBar, Toolbar, IconButton, Divider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

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
  drawer: {
    padding: theme.spacing(2)
  },
  menuList: {
    padding: 0,
    listStyleType: 'none',
  },
  menuItem: {
    marginBottom: theme.spacing(2),
  },
  drawerMenuLink: {
    textDecoration: 'none'
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
        color="inherit"
        className={classes.menuLink}
        href="#"
      >
        Logout
      </Link>      
    </React.Fragment>
  )
}

const MenuComponent = () => {
  const classes = useStyles()
  const {user, setUser} = useContext(UserContext)
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {user.isLoggedIn &&
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
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
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className={classes.drawer}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>          
          <Divider />
          <ul className={classes.menuList}>
            <li className={classes.menuItem}>
              <Link
                component={RouterLink}
                color="inherit"
                className={classes.drawerMenuLink}
                to="profile"
              >
                Profile
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link
                component={RouterLink}
                color="inherit"
                className={classes.drawerMenuLink}
                to="transaction"
              >
                New transaction
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link
                component={RouterLink}
                color="inherit"
                className={classes.drawerMenuLink}
                to="history"
              >
                Transaction list
              </Link>
            </li>
          </ul>
        </div>
      </Drawer>
    </div>
  );
}

export default MenuComponent;
