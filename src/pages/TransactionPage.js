import React, {useEffect, useState} from 'react'
import WrapForm from '../components/hoc/WrapForm'
import {Box, Button, TextField} from '@material-ui/core/'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import {getUserList, newTransaction} from '../store/slices/transaction'
import {info} from '../store/slices/user'
import WrapPage from '../components/hoc/WrapPage'
import {clearMessage} from '../store/slices/message'
import {useFormik} from "formik";
import * as Yup from "yup";
import {PropTypes} from "prop-types";

const TransactionPage = ({classes}) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const transaction = useSelector((state) => state.transaction)
    const message = useSelector(state => state.message.message)
    const [canSubmit, setCanSubmit] = useState(true);
    const formik = useFormik({
        initialValues: {
            name: transaction.name || '',
            amount: transaction.amount || ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .trim()
                .required("Name is required")
                .min(3, "Min name length is 3")
                .test(
                    'yourself',
                    'You can\'t sent to yourself',
                    (value, context) => {
                        if (!value) return;
                        return value.toString().toLowerCase() !== user.userName.toString().toLowerCase()
                    },
                )
                .nullable(),
            amount: Yup.number()
                .required("Amount is required")
                .min(1, "Min amount is 1")
                .max(user.balance, `Max amount is ${user.balance}`)
                .nullable()
        }),
        onSubmit: (values) => {
            setCanSubmit(false);
            const res = dispatch(newTransaction(values));
            res.then(() => {
                dispatch(info());
                formik.resetForm();
                setCanSubmit(true);
                setTimeout(() => {
                    dispatch(clearMessage())
                }, 3000)
            })
        }
    });

    return (
        <div className="container">
            <Box className={classes.root}>
                <h1>New transaction</h1>
                {message.text &&
                <Alert severity={message.type} className={classes.alert}>{message.text}</Alert>
                }
                <form
                    className={classes.form}
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >


                    <Autocomplete
                        freeSolo
                        value={formik.values.name}
                        options={transaction.userList.map((user) => user.name)}
                        onChange={(e, value) => formik.setFieldValue("name", value)}
                        renderInput={(params) => (
                            <TextField
                                name="name"
                                {...params}
                                label="User name"
                                className={classes.input}
                                error={formik.errors.name && formik.errors.name.length > 0 && formik.touched.name}
                                helperText={formik.errors.name}
                                value={formik.values.name}
                                onChange={(e) => {
                                    formik.setFieldValue("name", e.target.value)
                                    dispatch(getUserList({filter: e.target.value}))
                                }}
                            />
                        )}
                    />

                    <TextField
                        name="amount"
                        className={classes.input}
                        label="Amount"
                        type="number"
                        error={formik.errors.amount && formik.errors.amount.length > 0 && formik.touched.amount}
                        helperText={formik.errors.amount}
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!formik.isValid || !formik.dirty || !canSubmit}
                    >
                        Send PW
                    </Button>
                </form>
            </Box>
        </div>
    );
}

TransactionPage.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        form: PropTypes.string.isRequired,
        input: PropTypes.string.isRequired,
    })
}

export default WrapPage(WrapForm(TransactionPage));