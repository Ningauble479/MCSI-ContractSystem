import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box'
import { TextField, Button, Typography, Modal } from '@material-ui/core';

import { useState } from 'react'
import axios from '../../scripts/axios'

import { makeStyles } from '@material-ui/core/styles';



function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


let CompanyModal = (props) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    let [companies, setCompanies] = useState(props.companies)
    let [companyAdd, setCompanyAdd] = useState(null)
    console.log(companies)
    
    let deleteCompany = async (id, company) => {
        let data = await axios('post', '/api/Admin/updateItem', {id: id, update: { $pull: { 'specificContracts': company}} })

    }


    let addCompany = async (id) => {
        let newArray = companies
        newArray.push(companyAdd)
        setCompanies([...newArray])
        let data = await axios('post', '/api/Admin/updateItem', {id: id, update: {$push : {'specificContracts': companyAdd}}})
        console.log(data)
    }


    return (
        <Box style={modalStyle} className={classes.paper}>
            <TableContainer >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align='left'>{props.id}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { !companies ? <div>loading...</div> : companies.map((row)=>{
                    return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row}
                      </TableCell>
                      <TableCell><Button variant='outlined' value={row} onClick={(e)=>{deleteCompany(props.id, row)}}>Delete</Button></TableCell>
                    </TableRow> )
                  })
                }
                <TableRow>
                    <TableCell>
                        <TextField id="filled-basic" label="Add A Company" variant="filled" onChange={(e)=>{setCompanyAdd(e.target.value)}} />
                    </TableCell>
                    <TableCell>
                        <Button value={props.id} onClick={(e)=>{addCompany(props.id)}}>Add</Button>
                    </TableCell>
                </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        </Box>
    )
}


export default function CreateItem(){

    let [productName, setProductName] = useState(null)
    let [productPrice, setProductPrice] = useState(null)
    let [companyName, setCompanyName] = useState(null)
    let [items, setItems] = useState(null)
    let [changePrice, setChangePrice] = useState(null)
    let [modalOpen, openModal] = useState(false)
    let [modalContent, setModalContent] = useState([])
    let [currentid, setCurrentid] = useState(null)
    
    let sendData = async () => {
        let data = await axios('post', '/api/Admin/addItem', {productName, productPrice, companyName})
        console.log(data.data)
        let newItem = data.data
        let newArray = items
        newArray.push(newItem)
        setItems([...newArray])
        setProductName('')
        setProductPrice('')
        setCompanyName('')
    }

    let getData = async () => {
        let data = await axios('get', '/api/Admin/getItems')
        setItems(data.data)
    }

    let deleteData = async (id) => {
        let data = await axios('post', '/api/Admin/removeItem', {id: id})
        setItems(items.filter(item => item._id !== id))
    }

    let updateData = async (id) => {
        let data = await axios('post', '/api/Admin/updateItem', {id: id, update: {'price': changePrice}})
        console.log(data)
    }



    let updateState = async (id, newContracts) => {
        let array = [...items]
        let objIndex = array.findIndex((obj => obj._id == id))
        array[objIndex].specificContracts = newContracts
        setItems([...array])
    }

    useEffect(()=>{
        getData()
    },[])

    let handleClick = (e, contracts) => {
        console.log(contracts)
        setCurrentid(e.currentTarget.dataset.id)
        setModalContent(contracts); 
        openModal(true)
    }

    let handleClose = () => {
        openModal(false)
        updateState(currentid, modalContent)
        setModalContent([])
        setCurrentid(null)
    }

    return (
        <Box>
            <Box width='100vw' textAlign='center' pb={4}>
            <form style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                            <TextField id="filled-basic" label="Product Name" variant="filled" value={productName} onChange={(e)=>{setProductName(e.target.value)}} />
                            <TextField id="filled-basic" label="Product Price" variant="filled" value={productPrice} onChange={(e)=>{setProductPrice(e.target.value)}} />
                            <TextField id="filled-basic" label="For a specific company?" variant="filled" value={companyName} onChange={(e)=>{setCompanyName(e.target.value)}} />
                            <Button variant='outlined' onClick={()=>{sendData()}}>Create Product</Button>
                        </form>
            </Box>
            <Box>
                <Typography variant='h4'>Current Products</Typography>
            </Box>
            <TableContainer >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Specific Companies</TableCell>
                    <TableCell align='left'>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { !items ? <div>loading...</div> : items.map((row)=>{
                    return (<TableRow>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="left" style={{display: 'flex'}}>
                                  <TextField id="filled-basic" label="Price Of Item" variant="filled" defaultValue={`${row.price}`} onChange={(e)=>{setChangePrice(e.target.value)}} />
                                  <Button variant='outlined' value={row._id} onClick={(e)=>{updateData(e.currentTarget.value)}}>Update</Button>
                              </TableCell>
                              <TableCell align="left">{row.specificContracts.length} 
                                <Button value={[row.specificContracts]} data-id={row._id}  onClick={(e)=>{handleClick(e, row.specificContracts)}}>Edit</Button>
                                <Modal open={modalOpen} onClose={()=>{handleClose()}}>
                                        <CompanyModal companies={modalContent} id={currentid} updateState={updateState}/>
                                </Modal>
                              </TableCell>
                              <TableCell><Button variant='outlined' value={row._id} onClick={(e)=>{deleteData(e.currentTarget.value)}}>Delete</Button></TableCell>
                            </TableRow> )
                  })
                }
                </TableBody>
              </Table>
            </TableContainer>
        </Box>
    )
}