
import './App.css';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/home'
import Dashboard from './components/dashboard'
import Login from './components/login'
import { useState, useEffect } from 'react';
import axios from './scripts/axios';
import CreateAccount from './components/createAccount';


function App() {

  let [user, setUser] = useState(false)
  useEffect(async () => {
    let {data} = await axios('get', 'http://localhost:3001/api/Accounts/getAccount')
    console.log(data)
    if(data){
      setUser(true)
    }
  }, [])
  if(user){
  return (
    <div>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path='/admin/createAccount'>
              <CreateAccount/>
          </Route>
        </Switch>
    </div>
  );}
  else return <Login/>
}

export default App;
