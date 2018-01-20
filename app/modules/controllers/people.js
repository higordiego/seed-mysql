module.exports = app => {
    const People = app.datasource.models.People
    const Persistence = require('../../helpers/persistence')(People)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'status', 'reprove', 'time_id')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'status', 'reprove', 'time_id')(body)
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
