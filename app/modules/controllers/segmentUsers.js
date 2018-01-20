module.exports = app => {
    const SegmentsUser = app.datasource.models.SegmentsUser
    const Persistence = require('../../helpers/persistence')(SegmentsUser)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'segment_id', 'user_id')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'segment_id', 'user_id')(body)
            Persistence.update(req.params)(body)
        },
        listAll: (req, res) => Persistence.listAll(res),
        listOne: (req, res) => Persistence.listOne(req.params, res),
        delete: (req, res) => Persistence.delete(req.params)
    }
}
