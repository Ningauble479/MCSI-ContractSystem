import { AppBar, Box, Toolbar, Typography } from '@material-ui/core' 
import { Link } from 'react-router-dom'
export default function AdminMain(){
    return (
        <AppBar position="static">
          <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link className='linkClean' to='/main'><Typography variant="h6" >
              MCSI Contracts
            </Typography> 
            </Link>
            <Box display='flex' justifyContent='space-around' width='75%' height='100%'>
                <Box border='1px solid black' height='100%'>
                    <Link className='linkClean' to='/admin/addItem'>Add Items</Link>
                </Box>
                <Box>
                    <Link className='linkClean' to='/admin/createAccount'>Create New Account</Link>
                </Box>
                <Box>
                    <Link className='linkClean' to='/admin/checkAccounts'>Check Accounts</Link>
                </Box>
                <Box>
                    <Link className='linkClean' to='/admin/editContracts'>Add/Check Contracts</Link>
                </Box>
            </Box>
            <Link to='login' className='linkClean' color="inherit">Login</Link>
          </Toolbar>
        </AppBar>
    )
}