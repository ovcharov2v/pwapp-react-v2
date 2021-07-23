import './App.css';
import { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useDispatch, useSelector } from 'react-redux'
import { autoLogin } from './store/slices/auth'
import MenuComponent from './components/MenuComponent'

function App() {
  const dispatch = useDispatch()
  const routes = useRoutes(useSelector(state => Boolean(state.auth.token)))

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

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
