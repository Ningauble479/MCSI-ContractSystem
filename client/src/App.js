
import './App.css';
import {
  Route,
  Redirect
} from "react-router-dom";

import Dashboard from './components/dashboard'
import Login from './components/login'
import { useState, useEffect } from 'react';
import axios from './scripts/axios';
import CreateAccount from './components/createAccount';
import AdminMain from './components/adminDash/adminMain';
import CreateItem from './components/adminDash/createItems';
import Axios from 'axios'
import EditContracts from './components/adminDash/editContracts'
import MainNav from './components/users/main';
import SignContract from './components/users/signContract'
import DocuSigner from './components/users/docuSigner';

function App() {

  let [user, setUser] = useState(true)
  let [unsignedContract, setUnsignedContract] = useState(false)
  let [adminLevel, setAdmin] = useState(null)

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
      console.log(data.data)
      if(data.success == false){
        setUser(false)
        return
      }
      setAdmin(data.data.adminLevel)
      if(!data.data.contract || checkContracts(data.data.contracts)){
        setUnsignedContract(true)
        console.log('You have no contracts or unsigned contracts')
      }
    }
    fetchData()
  }, [user])




  return (
    <div> 
          <Route path='/'>
            {!user ? <Redirect to='/login'/> : <Redirect to='/main'/>}
          </Route>
          <Route path='/admin'>
            {adminLevel < 3 ? <Redirect to='/main'/> : <AdminMain/>}
          </Route>
          <Route exact path='/admin/addItem'>
            <CreateItem/>
          </Route>
          <Route path='/admin/createAccount'>
              <CreateAccount/>
          </Route>
          <Route path='/admin/editContracts'>
              <EditContracts/>
          </Route>
          <Route exact path="/">
            <Redirect to='/main'/>
          </Route>
          <Route path="/main">
            <MainNav admin={adminLevel < 3 ? false : true}/>
          </Route>
          <Route path='/main/SignDocs'>
            <SignContract/>
          </Route>
          <Route path='/main/docusigner/:id'>
            <DocuSigner/>
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path='/login'>
            {user ? <Redirect to='/main'/> : <Login sendData={sendData}/>}
          </Route>
    </div>
  );
}

export default App;
