let items = require('../../models/items')


module.exports = async (req,res) => {
    try {
        if(!req.user) return res.json({success: false, error: 'Please Sign In.'})
        let data = await items.find()
        return res.json({success: true, data: data})
    } catch (err) {
        return res.json({success: false, error: err})
    }
}