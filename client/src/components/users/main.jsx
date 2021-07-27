import { AppBar, Box, Toolbar, Typography } from '@material-ui/core' 
import { Link } from 'react-router-dom'




export default function MainNav(props){
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
          <Link to='login' className='linkClean' color="inherit">Login</Link>
        </Toolbar>
      </AppBar>
    )
}