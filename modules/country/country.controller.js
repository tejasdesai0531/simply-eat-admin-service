const CountryModel = require('../../models/country.model')
const { validationResult } = require('express-validator')
const CityCreatedPublisher = require('../../events/publishers/city-created-publisher')
const natsWrapper = require('../../config/nats-wrapper')
const { BadRequestError } = require('@simply-eat/common')
const CountryCreatedPublisher = require('../../events/publishers/country-created-publisher')


async function addCountry(req, res, next) {

    try {
        console.log('====req.body', req.body);
        const name = req.body.name
        const code = req.body.code
        const status = req.body.status

        const existingCountry = await CountryModel.getCountryByCode(code)
        if (existingCountry) {
            throw new BadRequestError('Country code already exists')
        }

        const country = await CountryModel.addCountry({ name, code, status })

        new CountryCreatedPublisher(natsWrapper.getClient()).publish(country)

        res.send({
            error: false,
            message: "Country created successfully",
            data: {
                country
            }
        })
    } catch (error) {
        next(error)
    }
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

// async function editCountry(req, res, next) {

//     try {

//         console.log('====req.body', req.body);
//         const id = req.body.id
// const name = req.body.name
// const code = req.body.code
// const status = req.body.status

//         const country = await CountryModel.editCountry({ id, name, code, status })

//         res.send({
//             error: false,
//             message: "Country edited successfully",
//             data: {
//                 country
//             }
//         })

//     } catch (error) {

//     }
// }

async function updateCountry(req, res) {
    CountryModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        code: req.body.code,
        status: req.body.status,
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "country not found with id " + req.params.id
                });
            };
            res.send(user);
        }).catch(err => {
            return res.send.status(500).send({
                message: "Error updating user with id " + req.params.id
            });
        });
};

async function deleteCountry(req, res) {

    CountryModel.findByIdAndRemove(req.params.id)
        .then(country => {
            if (!country) {
                return res.status(400).send({
                    message: "country has been not deleted with id " + + req.params.id
                });
            }
            res.send({ message: "country deleted successfully!" });
        }).catch(err => {
            return res.status(500).send({
                message: "Could not delete country with id " + req.params.id
            });
        })
}



module.exports = {
    addCountry,
    getCountryList,
    updateCountry,
    deleteCountry
}