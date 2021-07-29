    let accounts = require('../../models/main')


module.exports = async (req,res) => {

    try {
        console.log(req.body.search)
    let data = await accounts.find(req.body.search)
    console.log(data)
    return res.json({data: data, success: true})
    } catch (error) {
        return res.json({success: false, error: error})
    }
    
}