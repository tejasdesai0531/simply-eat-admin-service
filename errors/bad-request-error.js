const CustomError = require('./custom-error')

class BadRequestError extends CustomError {

    constructor(message) {
        super(message)
    }

    getStatusCode() { return 400 }

    serializeErrors() {
        return [{ message: this.message }]
    }
}

module.exports = BadRequestError