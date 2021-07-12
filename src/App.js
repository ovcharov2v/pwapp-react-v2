import './App.css';
import {useContext} from 'react';
import UserContext from './context'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes';
import MenuComponent from './components/MenuComponent';

function App() {
  const {user, setUser} = useContext(UserContext)
  const routes = useRoutes(user.isLoggedIn);
  
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
