class ExpressError extends Error{
    constructor(message,statusCode=400){
        super();
        this.ExpressMessage = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
