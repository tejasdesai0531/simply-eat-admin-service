const Listner = require('./base-listener')

class CityCreatedListner extends Listner {

    getSubject() { return 'city:created' }

    onMessage(data, msg) {
        console.log("Inside onMessage : ", data)
        msg.ack();
    }
}

module.exports = CityCreatedListner