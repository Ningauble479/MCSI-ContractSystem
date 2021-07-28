var express = require('express')
var routes = express.Router()
const AI = require('./addItem')
const GC = require('./getContracts')
const GSC = require('./getSpecificContract')
const GI = require('./getItems')

routes.post('/addItem', AI)
routes.get('/getContracts', GC)
routes.post('/getSpecificContract', GSC)
routes.get('/getContractItems', GI)

module.exports = routes;