const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {cityValidator} = require('./city.validator')
const validateRequest = require('@simply-eat/common')

const cityController = require('./city.controller')

router.get('/', cityController.getCityList)
// router.post('/',cityValidator,validateRequest, cityController.addCity)

module.exports = router;