const express = require('express')
const router = express.Router()

const countryRouter = require('./country/country.route')

router.use('/country', countryRouter)

module.exports = router;