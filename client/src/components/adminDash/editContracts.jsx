import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@material-ui/core";
import axios from '../../scripts/axios';
import { useState } from "react";
import React from 'react'



export default function EditContracts(){

    let [searchedCompany, setCompanySearch] = useState()
    let [companies, setCompanies]= useState([])
    let [showContracts, setShowContracts] = useState(false)
    let [shownContracts, setShownContracts] = useState([])
    let handleChange = async (e) => {
        setCompanySearch(e.target.value)
        let data = await axios('post', '/api/Admin/findAccounts', {search: {companyName:{$regex: e.target.value}}})
        let array = data.data
        setCompanies([...array])
    }

    let addContract = async (e) => {
        let data = await axios('post', '/api/Admin/addContract', {id: e.currentTarget.value})    
    }

    let getContracts = async (e) => {
        let {data} = await axios('post', '/api/Admin/getContracts', {id: e.currentTarget.value})
        console.log(data)
        setShowContracts(true)

        setShownContracts(data)
        
    }

    return (
        <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
            <Box width='100vw' display='flex' justifyContent='center' pt={3}>
                <TextField style={{width: '50%'}} id="filled-basic" label="Company Name" defaultValue={searchedCompany} variant="filled" onChange={(e)=>{handleChange(e)}}/>
            </Box>
            <Table style={{width: '40vw'}}>
                {showContracts ? <>
                    <React.Fragment>
                        <TableHead>
                        Rock On Trucks
                        </TableHead>
                        <TableBody>
                        {!shownContracts || !shownContracts.itemID || shownContracts.itemID.length == 0 ? 'This contract has no attatched items or they have not loaded' : shownContracts.itemID.map((row)=>{
                            <TableRow>
                                <TableCell>
                                    {row.name}
                                </TableCell>
                            </TableRow>
                        })}
                        </TableBody>
                    </React.Fragment>
                
                 </> : <>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Company Name
                        </TableCell>
                        <TableCell>
                            Contracts
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { !companies||companies.length === 0 ? <div>No Companies Found Did You Spell It Right?</div> : companies.map((row)=>{
                        return (
                            <TableRow>
                                <TableCell>
                                        {row.companyName}
                                </TableCell>
                                <TableCell>
                                    <Button value={row._id} onClick={(e)=>{addContract(e)}}>Create New</Button>
                                </TableCell>
                                <TableCell>
                                    <Button value={row._id} onClick={(e)=>{getContracts(e)}}>View/Edit</Button>
                                </TableCell>
                            </TableRow> 
                        )
                    })}
                </TableBody></>}
            </Table>
        </Box>
    )
}