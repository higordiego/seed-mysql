module.exports = app => {
    const Tips = app.datasource.models.Tip
    
    const Persistence = require('../../helpers/persistence')(Tips)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            console.log(body)
            Validate.validateBody(req.body, 'title', 'description', 'avatar')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'title', 'description', 'avatar')(body)
            Persistence.update(req.params)(body)
        },
        listAll: (req, res) => Persistence.listAll(res),
        listOne: (req, res) => Persistence.listOne(req.params, res),
        delete: (req, res) => Persistence.delete(req.params)
    }
}
