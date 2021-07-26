
import './App.css';
import {
  Route,
  Redirect
} from "react-router-dom";

import Home from './components/home'
import Dashboard from './components/dashboard'
import Login from './components/login'
import { useState, useEffect } from 'react';
import axios from './scripts/axios';
import CreateAccount from './components/createAccount';
import AdminMain from './components/adminDash/adminMain';
import CreateItem from './components/adminDash/createItems';
import Axios from 'axios'

function App() {

  let [user, setUser] = useState(true)
  let [usignedContract, setUnsignedContract] = useState(false)
  let [adminLevel, setAdmin] = useState(4)

  let checkContracts = async (contracts) => {
    let check = false
    if(adminLevel > 1) return
    contracts.map((contract)=>{
      if(contract.signed === false) check = true
    })
    return check
  }

  let sendData = async (username, password) => {
    let {data} = await Axios.post('/api/Accounts/login', {username: username, password: password})
    if(!data) return
    setUser(true)
  }

  useEffect(() => {
    let fetchData = async () => {
      let data = await axios('get', 'http://localhost:3001/api/Accounts/getAccount')
      console.log(data)
      if(data.success == false){
        setUser(false)
        return
      }
      setAdmin(data.adminLevel)
      if(!data.contract || checkContracts(data.contracts)){
        setUnsignedContract(true)
        console.log('You have no contracts or unsigned contracts')
      }
    }
    fetchData()
  }, [user])




  return (
    <div> 
          <Route path='/'>
            {!user ? <Redirect to='/login'/> : console.log(user)}
          </Route>
          <Route path='/admin'>
            {adminLevel < 3 ? <Redirect to='/'/> : <AdminMain/>}
          </Route>
          <Route exact path='/admin/addItem'>
            <CreateItem/>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path='/admin/createAccount'>
              <CreateAccount/>
          </Route>
          <Route exact path='/login'>
            {user ? <Redirect to='/'/> : <Login sendData={sendData}/>}
          </Route>
    </div>
  );
}

export default App;
