let contracts = require('../../models/contracts')


module.exports = async (req,res) => {
    try {
    let data = await contracts.find({companyID: req.body.id}).populate('items')
    return res.json({success: true, data: data})
    } catch (err) {
        return res.json({success: false, err: err})
    }
    
}