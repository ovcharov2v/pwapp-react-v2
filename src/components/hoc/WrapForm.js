import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        padding: theme.spacing(4),
        width: 300,
        border: '1px solid #eee',
        borderRadius: 16,
    },
    header: {
        "&:first-letter": {
            textTransform: 'uppercase'
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    alert: {
        marginBottom: theme.spacing(4),
    },
    input: {
        marginBottom: theme.spacing(4),
    },
    divider: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    toggleModeBtn: {
        width: '100%',
    },
}));

const WrapForm = (Component) => {

    const FormWrapper = () => {
        const classes = useStyles()

        return (
            <Component
                classes={classes}
            />
        );
    }

    return FormWrapper
}

WrapForm.protoTypes = {
    Component: PropTypes.element.isRequired
}


export default WrapForm;