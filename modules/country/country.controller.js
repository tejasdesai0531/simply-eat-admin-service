const CountryModel = require('../../models/country.model')

async function addCountry(req, res, next) {

    const name = req.body.name
    const code = req.body.code
    const status = req.body.status

    const country = await CountryModel.addCountry({ name, code, status })

    res.send({
        error: false,
        message: "Country created successfully",
        data: {
            country
        }
    })
}

async function getCountryList(req, res) {

    const countries = await CountryModel.getCountries()

    res.send({
        error: false,
        data: {
            countryList: countries
        }
    })
}

module.exports = {
    addCountry,
    getCountryList
}