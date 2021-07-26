let items = require('../../models/items')

module.exports = async (req,res) => {

    let data = await items.find()
    return res.json({success: true, data: data})
}