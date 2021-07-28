const items = require('../../models/items')

module.exports = (req,res) => {

    items.update( {_id: req.body.id}, {} )
}