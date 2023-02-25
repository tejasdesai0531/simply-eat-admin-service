const express = require('express')
const router = express.Router()

const countryRouter = require('./country/country.route')
const cuisineRouter = require('./cuisine/cuisine.route')

router.use('/country', countryRouter)
router.use('/cuisine', cuisineRouter)

module.exports = router;