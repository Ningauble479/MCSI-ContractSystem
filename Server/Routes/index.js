const express = require('express');
const router = express.Router();
const Accounts = require('./Accounts')


router.use('/Accounts', Accounts)

module.exports = router;