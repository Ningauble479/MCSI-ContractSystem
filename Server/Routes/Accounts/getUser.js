

module.exports = (req, res) => {
    console.log(req.session)
    console.log(req.user)
    return res.json({data: req.user, success: true})
}