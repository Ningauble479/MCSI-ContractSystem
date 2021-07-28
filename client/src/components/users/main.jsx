import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core' 
import { Link, Redirect } from 'react-router-dom'
import axios from '../../scripts/axios'




export default function MainNav(props){
    let logout = () => {
        axios('post', '/api/Accounts/logout')
        return <Redirect to='/login'/>
    }
    console.log(props.admin)
    return (
        <AppBar position="static">
        <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h6" >
            MCSI Contracts
          </Typography> 
          <Box display='flex' justifyContent='space-around' width='75%' height='100%'>
              <Box border='1px solid black' height='100%'>
                  <Link className='linkClean' to='/main/contract'>Check Your Contract</Link>
              </Box>
              <Box>
                  <Link className='linkClean' to='/main/support'>Support Ticket</Link>
              </Box>
              <Box>
                  <Link className='linkClean' to='/main/account'>My Account Info</Link>
              </Box>
              <Box>
                  <Link className='linkClean' to='/main/SignDocs'>Sign Docs</Link>
              </Box>
              {props.admin ? <Box><Link className='linkClean' to='/admin'>AdminPanel</Link></Box> : null}
          </Box>
          <Button onClick={()=>{logout()}}>Logout</Button>
        </Toolbar>
      </AppBar>
    )
}