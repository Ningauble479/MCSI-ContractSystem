let contracts = require('../../models/contracts')

module.exports = async (req,res) => {
    try {
        let data = await contracts.findOne({$and : [{companyID: req.user._id},{_id: req.body.id}]}).populate('itemID items').exec()
        return res.json({success: true, data: data})
    } catch (err) {
        return res.json({success: false, error: err})
    }
}