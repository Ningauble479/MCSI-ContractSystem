import {Grid, Box, Typography, TextField, Button} from '@material-ui/core'
import { useState } from 'react'

export default function Home (props){

    let [username, setUsername] = useState(null)
    let [password, setPassword] = useState(null)


    return (
        <Grid style={{height: '100vh'}} container direction="column" justifyContent="center" alignItems="center">
            <Box bgcolor='gray' borderRadius='25px' width='25vw' height='25vh' border='1px solid black'>
                <Box display='flex' container flexDirection="column" justifyContent="center" alignItems="center" nowrap style={{height: '100%'}}>
                    <Box height='10%' pt={3}><Typography>Login</Typography></Box>
                    <Box height='75%'>
                        <form style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                            <TextField id="filled-basic" label="Username" variant="filled" onChange={(e)=>{setUsername(e.target.value)}} />
                            <TextField id="filled-basic" label="Password" variant="filled" onChange={(e)=>{setPassword(e.target.value)}} />
                            <Button variant='outlined' onClick={()=>{props.sendData(username, password)}}>Login</Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}