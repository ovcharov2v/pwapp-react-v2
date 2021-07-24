import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core/'
import RepeatIcon from '@material-ui/icons/Repeat';
import { getTransactionList, setTransactionData, sortTransactionList } from '../store/slices/transaction'
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
  tableHeader: {
    cursor: 'pointer'
  },
  sortArrow: {
    display: 'inline-block',
    marginLeft: 3,
    transform: 'translateY(-1px)'
  },
  tableHeaderActive: {
    color: 'blue'
  },
  table: {
    minWidth: 650,
  },
  textRed: {
    color: 'red'
  },
  textGreen: {
    color: 'green'
  },
});

const HistoryPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const transaction = useSelector((state) => state.transaction)

  useEffect(() => {
    dispatch(getTransactionList())
  }, [])

  const TableHeader = ({ type, children }) => {
    const toggleDirection = () => {
      return (transaction.sort.dir === 'asc') ? 'desc' : 'asc'
    }
    return (
      <span
        className={classes.tableHeader + ' ' + ((transaction.sort.by === type) ? classes.tableHeaderActive : '')}
        onClick={() => {
          const direction = toggleDirection()
          dispatch(sortTransactionList({ sortBy: type, sortDir: direction }))
        }}
      >
        {children}
        {transaction.sort.by === type &&
          <span className={classes.sortArrow}>{transaction.sort.dir == 'asc' ? '↑' : '↓'}</span>
        }
      </span>
    )
  }

  return (
    <>
      {transaction.transformedTransactionList.length > 0 &&
        <div className={classes.tableWrapper}>
          <h1 className={classes.pageHeader}>Transaction list</h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><TableHeader type="date">Date</TableHeader></TableCell>
                  <TableCell align="right"><TableHeader type="name">User name</TableHeader></TableCell>
                  <TableCell align="right"><TableHeader type="amount">Amount</TableHeader></TableCell>
                  <TableCell align="right"><TableHeader type="balance">Balance</TableHeader></TableCell>
                  <TableCell align="right">Repeat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transaction.transformedTransactionList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.date}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right" className={(row.amount > 0) ? classes.textGreen : classes.textRed}>{Math.abs(row.amount)}</TableCell>
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
      {transaction.transformedTransactionList.length === 0 &&
        <h2 className={classes.noTransactionMessage}>No transaction yet</h2>
      }
    </>
  );
}

export default HistoryPage;