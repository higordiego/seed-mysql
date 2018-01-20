module.exports = app => {
    const Segment = app.datasource.models.Segment
    const Persistence = require('../../helpers/persistence')(Segment)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description')(body)
            Persistence.update(req.params)(body)
        },
        listAll: (req, res) => Persistence.listAll(res),
        listOne: (req, res) => Persistence.listOne(req.params, res),
        delete: (req, res) => {
            console.log(req.params)
            Persistence.delete(req.params, res)
        }
    }
}
