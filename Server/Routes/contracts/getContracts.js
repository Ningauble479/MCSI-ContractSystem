let contracts = require('../../models/contracts')

module.exports = async (req,res) => {
    try {
    console.log(req.user)
    let data = await contracts.find({companyID: req.user._id})
    console.log(data)
    return res.json({success: true, data: data})
} catch (err) {
    return res.json({error: err, success: false})
}
}