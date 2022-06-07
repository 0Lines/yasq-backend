class InvalidInfoException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = InvalidInfoException;
