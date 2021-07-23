import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage'
import TransactionPage from './pages/TransactionPage'
import HistoryPage from './pages/HistoryPage'
import AuthPage from './pages/AuthPage'

export const useRoutes = (isLoggedIn) => {
  if(isLoggedIn) {
    return (
      <Switch>
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/transaction" exact component={TransactionPage} />
        <Route path="/history" exact component={HistoryPage} />
        <Redirect to="/profile" />
      </Switch>
    )
  }
  else {
    return (
      <Switch>
        <Route path="/auth" exact component={AuthPage} />    
        <Redirect to="/auth" />
      </Switch>   
    ) 
  }
}