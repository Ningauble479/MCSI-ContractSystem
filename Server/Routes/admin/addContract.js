let contracts = require('../../models/contracts')
let users = require('../../models/main')

module.exports = (req,res) => {
    
    let contract = new contracts()

    contract.companyID = req.body.id
    contract.signed = false;
    contract.signedUS = false;
    contract.monthlyPrice = 0

    contract.save((err,data)=>{
        if(err) return res.json({success:false, err: err})
        console.log(req.body.id)
        console.log(data._id)
        users.findOneAndUpdate({_id: req.body.id}, {$push: {'contractids': data._id}}).exec()
        return res.json({success: true})
        
    })  
} 