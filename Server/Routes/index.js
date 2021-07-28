const express = require('express');
const router = express.Router();
const Accounts = require('./Accounts')
const Admin = require('./admin')
const Contracts = require('./contracts')

router.use('/Accounts', Accounts)
router.use('/Admin', Admin)
router.use('/Contracts', Contracts)

module.exports = router;