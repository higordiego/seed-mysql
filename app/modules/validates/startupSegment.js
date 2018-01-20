module.exports = app => {
    const Errors = require('../../errors/startupSegment/error')
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res, next) => {
            const required = ['startup_id', 'segment_id']
            const error = Validate.requestRequired(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        update: (req, res, next) => {
            const required = ['startup_id', 'segment_id']
            const error = Validate.requestOptional(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        isId: (req, res, next) => Validate.isId(req.params.id) ? res.status(400).json(Errors.idNotValid) : next()
    }
}
