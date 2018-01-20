module.exports = app => {
    const Enterprise = app.datasource.models.Enterprise
    const Persistence = require('../../helpers/persistence')(Enterprise)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'user_id')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'user_id')(body)
            Persistence.update(req.params)(body)
        },
        listAll: (req, res) => {
            const query = {
                where: {},
                include: {all: true}
            }
            Persistence.listAllQuery(query, res)
        },
        listOne: (req, res) => Persistence.listOne(req.params, res),
        delete: (req, res) => Persistence.delete(req.params)
    }
}
