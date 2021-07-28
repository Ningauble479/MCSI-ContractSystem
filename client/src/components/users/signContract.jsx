import { Box, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from '../../scripts/axios'
import { Link } from 'react-router-dom'
export default function SignDocs () {

    let [contracts, setContracts] = useState()

    let getContracts = async () => {
        let {data} = await axios('get', '/api/Contracts/getContracts')
        console.log(data)
        setContracts(data)
    }

    useEffect(()=>{
        getContracts()
    },[])
    return (
        <Box display='flex' flexGrow='1' flexWrap='wrap' justifyContent='space-around' pt={5} pr={'20%'} pl={'20%'}  >
            {
                !contracts ? <div>loading contracts...</div> : contracts.map((row)=>{
                    return (
                    <Link to={`/main/docusigner/${row._id}`}>
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='150px' margin='25px' height='150px' border='1px solid black'>
                        <Typography variant='h5'>{row.items.length == 0 ? 'No Items' : null}</Typography>
                        <Typography variant='h5'>{row.signed ? null : 'Unsigned'}</Typography>
                    </Box>
                    </Link>
                    )
                })
            }
        </Box>
    ) 
}