module.exports = app => {
    const Errors = require('../../errors/authenticate/error')
    const Validate = require('../../helpers/validate')
    return {
        authenticate: (req, res, next) => {
            const required = ['email', 'password']
            const error = Validate.requestRequired(req, required, Errors)
            error ? res.status(400).json(error) : next()
        }
    }
}
