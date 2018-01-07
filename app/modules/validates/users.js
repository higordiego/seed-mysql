module.exports = app => {
    const Errors = require('../../errors/user/error')
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res, next) => {
            const required = ['email', 'password', 'name', 'phone']
            const error = Validate.requestRequired(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        update: (req, res, next) => {
            const required = ['email', 'password', 'name']
            const error = Validate.requestOptional(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        isId: (req, res, next) => Validate.isId(req.params._id)
    }
}
