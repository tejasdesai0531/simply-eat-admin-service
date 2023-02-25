const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const validateRequest = require('../../middlewares/validate-request')

const { cuisineValidator } = require('./cuisine.validator')

const cuisineController = require('./cuisine.controller')

router.get('/', cuisineController.getCuisineList)
router.post('/', cuisineValidator, cuisineController.addCuisine)

module.exports = router;