const Publisher = require('./base-publisher')

class CityCreatedPublisher extends Publisher {

    getSubject() { return 'city:created' }
}

module.exports = CityCreatedPublisher