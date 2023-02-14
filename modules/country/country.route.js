const express = require('express')
const router = express.Router()

const countryController = require('./country.controller')

router.get('/', countryController.getCountryList)
router.post('/', countryController.addCountry)

module.exports = router;