const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {countryValidator} = require('./country.validator')
const {validateRequest} = require('@simply-eat/common')

const countryController = require('./country.controller')

router.get('/', countryController.getCountryList)
router.post('/',countryValidator,validateRequest, countryController.addCountry)
router.put('/:id', countryValidator, validateRequest,countryController.updateCountry)
router.delete('/:id',countryController.deleteCountry)



module.exports = router;