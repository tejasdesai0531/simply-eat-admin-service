const {BadRequestError} = require('@simply-eat/common')
const CityModel = require('../../models/city.model')
const { validationResult } = require('express-validator')
const {RequestValidationError} = require('@simply-eat/common')
const CityCreatedPublisher = require('../../events/publishers/city-created-publisher')
const natsWrapper = require('../../config/nats-wrapper')


async function addCity(req, res, next) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors)
        }

        const name = req.body.name
        const code = req.body.code
        const status = req.body.status
        const cityId = req.body.cityId
    
        const city = await CityModel.addCity({ name, code, status })
    
        res.send({
            error: false,
            message: "City created successfully",
            data: {
                city
            }
        })
    } catch (error) {
        next(error)
    }
}

async function getCityList(req, res) {

    const cities = await CityModel.getCityList()

    res.send({
        error: false,
        data: {
            cityList: cities
        }
    })
}


async function updateCity(req, res) {
    CityModel.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        code: req.body.code,
        status: req.body.status,
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "city not found with id " + req.body.id
                });
            };
            res.send(user);
        }).catch(err => {
            return res.send.status(500).send({
                message: "Error updating user with id " + req.body.id
            });
        });
};

async function deleteCity(req, res) {

    CityModel.findByIdAndRemove(req.body.id)
        .then(city => {
            if (!city) {
                return res.status(400).send({
                    message: "city has been not deleted with id " + + req.body.id
                });
            }
            res.send({ message: "city deleted successfully!" });
        }).catch(err => {
            return res.status(500).send({
                message: "Could not delete city with id " + req.body.id
            });
        })
}

module.exports = {
    addCity,
    getCityList
}