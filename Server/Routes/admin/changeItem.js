let items = require('../../models/items')

module.exports = async (req,res) => {
    try {
        console.log(req.body.update)
        console.log(req.body.id)
    let data = await items.findOneAndUpdate({_id: req.body.id}, req.body.update, {new: true})
    console.log(data)
    return res.json({success: true, data: data})}
    catch (err) {console.log(err)}
}