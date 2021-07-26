const express = require('express');
const router = express.Router();
const Accounts = require('./Accounts')
const Admin = require('./admin')

router.use('/Accounts', Accounts)
router.use('/Admin', Admin)
module.exports = router;