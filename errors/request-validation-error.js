const CustomError = require('./custom-error')

class RequestValidationError extends CustomError {

    
    constructor(errors) {
        super('Invalid request parameters')
        this.errors = errors
    }
    
    getStatusCode() { return 400 }

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        })
    }
}

module.exports = RequestValidationError