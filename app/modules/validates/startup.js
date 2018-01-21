module.exports = app => {
    const Errors = require('../../errors/startup/error')
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res, next) => {
            const required = ['title', 'problematic', 'investiment', 'user_id']
            const error = Validate.requestRequired(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        update: (req, res, next) => {
            const required = ['title', 'investiment', 'user_id', 'problematic']
            const error = Validate.requestOptional(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        isId: (req, res, next) => Validate.isNumber(req.params.id, res, next, Errors.idNotValid)
    }
}
