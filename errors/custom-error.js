class CustomError extends Error {

    constructor(message) {
        super(message)
    }

    getStatusCode() {
        throw new Error("Method 'getStatusCode()' must be implemented.");   
    }

    serializeErrors() {
        throw new Error("Method 'serializeErrors()' must be implemented.");
    }
}

module.exports = CustomError