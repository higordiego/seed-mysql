module.exports = app => {
    const SegmentEnterprise = app.datasource.models.SegmentEnterprise
    const Persistence = require('../../helpers/persistence')(SegmentEnterprise)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'segment_id', 'startup_id', 'enterprise_id')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'segment_id', 'startu_id', 'enterprise_id')(body)
            Persistence.update(req.params)(body)
        },
        listAll: (req, res) => Persistence.listAll(res),
        listOne: (req, res) => Persistence.listOne(req.params, res),
        delete: (req, res) => Persistence.delete(req.params)
    }
}
