import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Typography, Link, AppBar, Toolbar, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import LeftMenu from './LeftMenu';
import {logout} from '../store/slices/auth'
import {useDispatch, useSelector} from 'react-redux'

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
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = React.useState(false);
    const user = useSelector((state) => state.user)
    const isLoggedIn = useSelector((state) => Boolean(state.auth.token))

    const toggleLeftMenu = () => {
        setIsOpen(!isOpen)
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
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        dispatch(logout());
                    }
                    }
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
                    {isLoggedIn &&
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleLeftMenu}
                        edge="start"
                    >
                        <MenuIcon/>
                    </IconButton>
                    }
                    <Typography variant="h6" className={classes.title}>
                        PWApp
                    </Typography>
                    {isLoggedIn &&
                    <UserMenu/>
                    }
                </Toolbar>
            </AppBar>
            <LeftMenu
                isOpen={isOpen}
                toggleLeftMenu={toggleLeftMenu}
            />
        </div>
    );
}

export default MenuComponent;
