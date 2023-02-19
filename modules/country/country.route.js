const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const validateRequest = require('../../middlewares/validate-request')

const countryController = require('./country.controller')

router.get('/', countryController.getCountryList)
router.post('/', countryController.addCountry)

module.exports = router;