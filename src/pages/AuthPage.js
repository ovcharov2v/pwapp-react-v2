import React, {useState} from 'react'
import WrapForm from '../components/hoc/WrapForm'
import {Box, Button, TextField, Divider} from '@material-ui/core/'
import Alert from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import {login, register} from '../store/slices/auth'
import WrapPage from '../components/hoc/WrapPage'
import {clearMessage} from '../store/slices/message'
import {useFormik} from "formik";
import * as Yup from "yup";
import {PropTypes} from "prop-types";

const AuthPage = ({classes}) => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.message.message)
    const [formMode, setFormMode] = useState('login')
    const [canSubmit, setCanSubmit] = useState(true);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            email: '',
            password: '',
            repassword: '',
            formMode: formMode,
        },
        validationSchema: Yup.object({
            formMode: Yup.string(),
            name: Yup.string()
                .when('formMode', {
                    is: 'register',
                    then: Yup.string()
                        .trim()
                        .required("Name is required")
                        .min(3, "Min name length is 3")
                        .nullable(),
                }),
            email: Yup.string()
                .trim()
                .required("Email is required")
                .email('Enter valid email')
                .nullable(),
            password: Yup.string()
                .trim()
                .required('Password is required')
                .min(6, 'Min password length is 6')
                .nullable(),
            repassword: Yup.string()
                .when('formMode', {
                    is: 'register',
                    then: Yup.string()
                        .trim()
                        .required('Retype your password')
                        .min(6, 'Min password length is 6')
                        .test({
                            message: 'Passwords must match',
                            test: function (value) {
                                return value === formik.values.password
                            },
                        })
                }),
        }),
        onSubmit: (values) => {
            setCanSubmit(false);
            if (formMode === 'register') {
                const res = dispatch(register(values))
                res.then(() => {
                    setCanSubmit(true);
                })
            } else {
                const res = dispatch(login(values))
                res.then(() => {
                    setCanSubmit(true);
                })
            }
        }
    });

    const toggleFormMode = () => {
        const newFormMode = formMode === 'login' ? 'register' : 'login'
        setFormMode(newFormMode)
        formik.setFieldValue('formMode', newFormMode).then(() => {
            formik.resetForm()
        })

        dispatch(clearMessage())
    }

    return (
        <Box className={classes.root}>
            <h1 className={classes.header}>{formMode === 'register' ? 'Register' : 'Login'}</h1>
            {message.text &&
            <Alert severity={message.type} className={classes.alert}>{message.text}</Alert>
            }
            <form
                className={classes.form}
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                {formMode === 'register' &&
                <TextField
                    name="name"
                    className={classes.input}
                    label="User name"
                    type="text"
                    error={formik.errors.name && formik.errors.name.length > 0 && formik.touched.name}
                    helperText={formik.errors.name}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                }
                <TextField
                    name="email"
                    className={classes.input}
                    label="Email"
                    type="email"
                    error={formik.errors.email && formik.errors.email.length > 0 && formik.touched.email}
                    helperText={formik.errors.email}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <TextField
                    name="password"
                    className={classes.input}
                    label="Password"
                    type="password"
                    error={formik.errors.password && formik.errors.password.length > 0 && formik.touched.password}
                    helperText={formik.errors.password}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formMode === 'register' &&
                <TextField
                    name="repassword"
                    className={classes.input}
                    label="Repeat password"
                    type="password"
                    error={formik.errors.repassword && formik.errors.repassword.length > 0 && formik.touched.repassword}
                    helperText={formik.errors.repassword}
                    onChange={formik.handleChange}
                    value={formik.values.repassword}
                />
                }
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!formik.isValid || !formik.dirty || !canSubmit}
                >
                    {formMode === 'register' ? 'Register' : 'Login'}
                </Button>
            </form>
            <Divider className={classes.divider}/>
            <Button
                color="primary"
                type="button"
                onClick={toggleFormMode}
                className={classes.toggleModeBtn}
            >
                {formMode === 'login' &&
                <>Register new account</>
                }
                {formMode === 'register' &&
                <>Already have account</>
                }
            </Button>

        </Box>
    );
}

AuthPage.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        form: PropTypes.string.isRequired,
        input: PropTypes.string.isRequired,
        divider: PropTypes.string.isRequired,
        toggleModeBtn: PropTypes.string.isRequired,
    })
}

export default WrapPage(WrapForm(AuthPage))