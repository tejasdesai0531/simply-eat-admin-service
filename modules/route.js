const express = require('express')
const router = express.Router()

const countryRouter = require('./country/country.route')
const cuisineRouter = require('./cuisine/cuisine.route')
const cityRouter = require('./city/city.route')


router.use('/country', countryRouter)
router.use('/cuisine', cuisineRouter)
router.use('/city', cityRouter)


module.exports = router;