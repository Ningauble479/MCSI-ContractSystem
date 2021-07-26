import {Grid, Box, Typography, TextField, Button} from '@material-ui/core'
import { useState } from 'react'
import axios from '../scripts/axios'

export default function CreateAccount (){

    let [username, setUsername] = useState(null)
    let [password, setPassword] = useState(null)
    let [companyName, setCompanyName] = useState(null)
    let [email, setEmail] = useState(null)
    
    let sendData = async () => {
        let data = await axios('post', '/api/Accounts/register', {username, password, companyName, email})
        console.log(data)
    }

    return (
        <Grid style={{height: '100vh'}} container direction="column" justifyContent="center" alignItems="center">
            <Box bgcolor='gray' borderRadius='25px' width='25vw' height='50vh' border='1px solid black'>
                <Box display='flex' container flexDirection="column" justifyContent="center" alignItems="center" nowrap style={{height: '100%'}}>
                    <Box height='10%' pt={3}><Typography>Login</Typography></Box>
                    <Box height='75%'>
                        <form style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                            <TextField id="filled-basic" label="Username" variant="filled" onChange={(e)=>{setUsername(e.target.value)}} />
                            <TextField id="filled-basic" label="Password" variant="filled" onChange={(e)=>{setPassword(e.target.value)}} />
                            <TextField id="filled-basic" label="Company Name" variant="filled" onChange={(e)=>{setCompanyName(e.target.value)}} />
                            <TextField id="filled-basic" label="Email" variant="filled" onChange={(e)=>{setEmail(e.target.value)}} />
                            <Button variant='outlined' onClick={()=>{sendData()}}>Create Account</Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}