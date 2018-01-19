module.exports = app => {
    const User = app.datasource.models.User
    const Persistence = require('../../helpers/persistence')(User)
    const Business = require('../business/users')(app)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'email', 'phone', 'password', 'types_user_id')(body)
            Business.create(body)
                .then(Persistence.create(res))
                .catch(err => res.status(500).json(err))
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'email', 'phone', 'password')(body)
            Business.update(body)
                .then(Persistence.update(req.params))
                .catch(err => res.status(400).json(err))
        },
        listAll: (req, res) => Persistence.listAll(res),
        listOne: (req, res) => Persistence.listOne(req.params, res),
        delete: (req, res) => Persistence.delete(req.params)
    }
}
