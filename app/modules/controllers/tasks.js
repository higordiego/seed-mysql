module.exports = app => {
    const Tasks = app.datasource.models.Task
    const Persistence = require('../../helpers/persistence')(Tasks)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'startup_id', 'enterprise_id')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'startup_id', 'enterprise_id')(body)
            Persistence.update(req.params)(body)
        },
        listAll: (req, res) => Persistence.listAll(res),
        listOne: (req, res) => Persistence.listOne(req.params, res),
        delete: (req, res) => Persistence.delete(req.params)
    }
}
