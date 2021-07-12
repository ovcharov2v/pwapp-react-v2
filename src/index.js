import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import UserContext from './context'
import 'normalize.css'
import '@fontsource/roboto';
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'

function Main() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    userName: null,
    email: null,
    ballance: null,
    token: null,
  })
  return (    
    <React.StrictMode> 
      <UserContext.Provider value={{user, setUser}}>
        <App />
      </UserContext.Provider>    
    </React.StrictMode>
  )
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
