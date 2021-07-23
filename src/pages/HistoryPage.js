import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core/'
import RepeatIcon from '@material-ui/icons/Repeat';
import { getTransactionList, setTransactionData } from '../store/slices/transaction'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles({
  tableWrapper: {
    maxWidth: 800,
    margin: '0 auto',
  },
  pageHeader: {
    marginBottom: 30,
    textAlign: 'center',
  },
  noTransactionMessage: {
    marginBottom: 30,
    textAlign: 'center',
    color: '#ddd'
  },
  table: {
    minWidth: 650,
  },
});

const HistoryPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const transactionList = useSelector((state) => state.transaction.transactionList)

  useEffect(() => {
    dispatch(getTransactionList())
  }, [])

  return (
    <>
      {transactionList.length > 0 &&
        <div className={classes.tableWrapper}>
          <h1 className={classes.pageHeader}>Transaction list</h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">User name</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Balance</TableCell>
                  <TableCell align="right">Repeat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.date}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.balance}</TableCell>
                    <TableCell align="right">
                      {row.amount < 0 &&
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.button}
                          startIcon={<RepeatIcon />}
                          component={RouterLink}
                          onClick={() => {
                            dispatch(setTransactionData({ name: row.username, amount: Math.abs(row.amount) }))
                          }}
                          to={'/transaction'}
                        >
                          Repeat
                        </Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
      {transactionList.length === 0 &&
        <h2 className={classes.noTransactionMessage}>No transaction yet</h2>
      }
    </>
  );
}

export default HistoryPage;