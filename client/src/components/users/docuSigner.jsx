import { TextField, Box, Table, TableCell, TableHead, TableRow, Typography, TableBody, Input, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "../../scripts/axios";
import { useParams } from 'react-router-dom'

export default function DocuSigner () {
    let [contract, setContract] = useState(null)
    let [items, setItems] = useState(null)
    let [addedItems, setAddedItems] = useState(null)
    let [monthlyPrice, setMonthlyPrice] = useState(0)
    let [itemAmount, setItemAmount] = useState(0)
    


    let { id } = useParams();
    let getContract = async () => {
        let {data} = await axios('post', '/api/Contracts/getSpecificContract', {id: id})
        console.log(data.itemID)
        console.log(data)
        const mergedList = await data.itemID.reduce((acc, u) => {
            const item = data.items.find(a => a.item == u._id);
            console.log(u)
            if (item) {
                console.log('match found')
              acc.push({ 
                amount: item.amount,
                name: u.name,
                price: u.price,
                _id: u._id
              })
            }
            
            return acc;
          }, []);
          console.log(mergedList)
        setAddedItems(mergedList)
        setContract(data)
        let price = 0
        for(let i=0; i<mergedList.length; i++){
            price = price + (parseInt(mergedList[i].price) * parseInt(mergedList[i].amount))
        }
        console.log(price)
        setMonthlyPrice(price)
        getItems(data.itemID)
    }

    let getItems = async (addedItems) => {
        let {data} = await axios('get', '/api/Contracts/getContractItems')
        let items = data
        let addedItemss = addedItems
        let result = items.filter(o1 => !addedItemss.some(o2 => o1._id === o2._id));
        setItems(result)
    }

    let addItem = async (e) => {
        let id = e.currentTarget.value
        let {data} = await axios('post', '/api/Contracts/addItem', {amount: itemAmount, itemid: e.currentTarget.value, monthlyprice: monthlyPrice, contractid: contract._id})
        console.log(data)
        setItems(items.filter(item => item._id !== id))
        
    }

    useEffect(()=>{
        getContract()
    },[])
    if(!contract) return <div>Loading...</div>
    return (
        <Box display='flex' flexDirection='column' justifyContent='space-between'>
        <Box border='1px solid black' height='10vh' width='100%'>
            <Typography>Test</Typography>
        </Box>
        <Box display='flex' justifyContent='space-around' flexGrow='1'>
            <Box width='45%' height='75vh' border='1px solid black'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>How Many</TableCell>
                            <TableCell>Add</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!items ? <div>loading...</div> : items.map((row)=>{
                            return (<TableRow>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell><TextField id="filled-basic" label="Amount" variant="filled" onChange={(e)=>{setItemAmount(e.target.value)}}/></TableCell>
                                <TableCell><Button value={row._id} onClick={(e)=>{addItem(e)}}>Add -></Button></TableCell>
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </Box>
            <Box width='45%' height='75vh' border='1px solid black'>
            <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>How Many</TableCell>
                            <TableCell>Add</TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody>
                        {!addedItems ? <div>Added Items Will Appear Here</div> : addedItems.map((row)=>{
                            return (<TableRow>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell><TextField id="filled-basic" label="Amount" variant="filled" defaultValue={row.amount} /></TableCell>
                                <TableCell><Button>Change</Button></TableCell>
                            </TableRow>)
                        })}
                        <TableRow>
                            <TableCell>Monthly Price</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{monthlyPrice}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </Box>
        </Box>
    )
}