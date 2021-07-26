const items = require('../../models/items')

module.exports = (req,res) => {

    let item = new items()
    console.log(req.body)
    item.name = req.body.productName
    item.price = req.body.productPrice
    if(req.body.companyName) item.specificContracts = [req.body.companyName] 

    item.save((err, data)=>{
        if(err) return console.log(err)
        return res.json({success: true, data: data})
    })


}