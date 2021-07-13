import './App.css';
import { useContext } from 'react';
import UserContext from './context'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes';
import MenuComponent from './components/MenuComponent';
import api from './api'

function App() {
  const { user, setUser } = useContext(UserContext)
  const routes = useRoutes(user.isLoggedIn, getUserInfo);

  function getUserInfo() {
    fetch(api.userInfoUrl, {
      headers: {
        'Authorization': 'Bearer ' + user.token,
      }
    }).then((res) => {
      if (res.ok) {
        res.json().then((json)=>{
          const newUser = { ...user }
          newUser.id = json.user_info_token.id
          newUser.userName = json.user_info_token.name
          newUser.email = json.user_info_token.email
          newUser.balance = json.user_info_token.balance
          setUser({ ...newUser })
        })
      }
      else {
        res.text().then((text) => {
          console.log(`Error: ${text}`)
        })
      }
    })
  }

  return (
    <div className="App">
      <Router>
        <MenuComponent />
        {routes}
      </Router>
    </div>
  );
}

export default App;
