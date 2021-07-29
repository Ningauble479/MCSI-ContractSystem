var express = require('express')
var routes = express.Router()
const AI = require('./addItem')
const GI = require('./getItems')
const UI = require('./changeItem')
const RI = require('./removeItem')
const AC = require('./addSpecificCompany')
const FA = require('./findAccounts')
const CC = require('./addContract')
const GC = require('./getContracts')

routes.post('/addItem', AI)
routes.get('/getItems', GI)
routes.post('/updateItem', UI)
routes.post('/removeItem', RI)
routes.post('/addCompany', AC)
routes.post('/findAccounts', FA)
routes.post('/addContract', CC)
routes.post('/getContracts', GC)

module.exports = routes;


