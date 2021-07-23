import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import { Drawer, Typography, Link, AppBar, Toolbar, IconButton, Divider } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  drawer: {
    minWidth: 200,
  },
  drawerTop: {
    padding: theme.spacing(2)
  },
  menuList: {
    padding: theme.spacing(2),
    listStyleType: 'none',
  },
  menuItem: {
    marginBottom: theme.spacing(2),
  },
  menuLink: {
    textDecoration: 'none'
  },
  menuLinkActive: {
    textDecoration: 'underline'
  },  
  back: {
    display: 'block',
    marginLeft: 'auto'
  },
}));

const LeftMenu = ({isOpen, toggleLeftMenu}) => {
  const classes = useStyles()

  const MenuLink = ({text, link}) => {
    return (
      <Link
        component={NavLink}
        color="inherit"
        className={classes.menuLink}
        to={link}
        activeClassName={classes.menuLinkActive}
        onClick={toggleLeftMenu}
      >
        {text}
      </Link>
    )
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
    >
      <div className={classes.drawer}>
        <div className={classes.drawerTop}>
          <IconButton onClick={toggleLeftMenu} className={classes.back}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <ul className={classes.menuList}>
          <li className={classes.menuItem}>
            <MenuLink text="Profile" link="/profile" />
          </li>
          <li className={classes.menuItem}>
            <MenuLink text="New transaction" link="/transaction" />
          </li>
          <li className={classes.menuItem}>
            <MenuLink text="Transaction list" link="/history" />
          </li>
        </ul>
      </div>
    </Drawer>
  );
}

export default LeftMenu;
