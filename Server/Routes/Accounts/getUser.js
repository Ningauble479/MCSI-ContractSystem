

module.exports = (req, res) => {
    console.log(req.session)
    console.log(req.user)
    if(!req.user) return res.json({success: false})
    return res.json({data: req.user, success: true})
}