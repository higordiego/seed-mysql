module.exports = app => {
    const Errors = require('../../errors/tasks/error')
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res, next) => {
            const required = ['name', 'description']
            const error = Validate.requestRequired(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        update: (req, res, next) => {
            const required = ['name', 'description', 'status']
            const error = Validate.requestOptional(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        isId: (req, res, next) => Validate.isId(req.params.id)
    }
}
