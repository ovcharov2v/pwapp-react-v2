import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import '@fontsource/roboto';
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store/store'
import {Provider} from 'react-redux'

function Main() {
  return (    
    <React.StrictMode> 
      <Provider store={store}>
          <App />
      </Provider>    
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
