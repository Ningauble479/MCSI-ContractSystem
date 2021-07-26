let items = require('../../models/items')

module.exports = async (req,res) => {
    try {
    let data = await items.findOneAndDelete({_id: req.body.id})
    console.log(data)
    return res.json({success: true, data: data})
    } catch (err){console.log(err)}



    
}