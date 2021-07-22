var express = require('express')
var routes = express.Router()
const RE = require('./register')
const GA = require('./getUser')
const LO = require('./logout')

const passport = require('../passport')


routes.post('/register', RE)

routes.post('/login', passport.authenticate('local', {session: true}), (req,res)=>{
    console.log(req._passport)
    res.send('test')
})

routes.post('/logout', LO)

routes.get('/getAccount', GA)


module.exports = routes;