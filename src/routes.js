import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage'
import TransactionPage from './pages/TransactionPage'
import HistoryPage from './pages/HistoryPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

export const useRoutes = (isLoggedIn, getUserInfo) => {
  if(isLoggedIn) {
    return (
      <Switch>
        <Route path="/profile" exact render={ (props) => <ProfilePage getUserInfo={getUserInfo} /> } />
        <Route path="/transaction" exact>
          <TransactionPage />
        </Route>
        <Route path="/history" exact>
          <HistoryPage />
        </Route>
        <Redirect to="/profile" />
      </Switch>
    )
  }
  else {
    return (
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>      
        <Redirect to="/login" />
      </Switch>   
    ) 
  }
}