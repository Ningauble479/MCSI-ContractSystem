const contracts = require('../../models/contracts')
const items = require('../../models/items')
const itemids = require('../../models/itemids')
const sales = require('../../models/sales')

module.exports = async (req,res) => {

    let amount = req.body.amount;
    let itemid = req.body.itemid;
    let monthlyprice = req.body.monthlyprice;
    let signed = false;
    let signedUS = false;
    let contractid = req.body.contractid;
    let companyid = req.user._id;
    console.log(req.user)
    let newSale = new sales();

    newSale.contractid = contractid;
    newSale.item = itemid;
    newSale.amount = amount;

    let newsaledata = await newSale.save()

    let saleid = newsaledata._id

    let updateContract = await contracts.findOneAndUpdate({companyID: companyid}, 
        {$push: {itemID: itemid, items: saleid},
        monthlyprice: monthlyprice, 
        signed: signed, 
        signedUS: signedUS},
        {new: true}).exec()
    
    for(let i=0; i<amount; i++){
        let newid = new itemids()
        newid.contractid = contractid;
        newid.item = itemid;
        newid.saleid = saleid;
        newid.customerSerial = 'abc123';
        newid.ourSerial = 'cba321';

        let data = await newid.save()

    }
    return res.json({success: true})
}