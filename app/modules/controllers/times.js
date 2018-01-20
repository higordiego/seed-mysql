module.exports = app => {
    const Time = app.datasource.models.Time
    const Persistence = require('../../helpers/persistence')(Time)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'experiences', 'email', 'user_id', 'avatar')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'experiences', 'email', 'user_id', 'avatar')(body)
            Persistence.update(req.params)(body)
        },
        listAll: (req, res) => {
            Persistence.listOneAllWithJoin({}, res)
        },
        listOne: (req, res) => Persistence.listOne(req.params, res),
        delete: (req, res) => Persistence.delete(req.params)
    }
}
