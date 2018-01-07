module.exports = app => {
    const User = require('../models/')
    const Persistence = require('../../helpers/persistence')(User)
    const Business = require('../business/users')(app)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) =>
            Validate.validateBody(req.body, 'name', 'email', 'phone', 'password')
                .then(Business.create)
                .then(Persistence.create(res))
                .catch(err => res.status(500).json(err)),
        update: (req, res) =>
            Validate.validateBody(req.body, 'name', 'email', 'phone', 'password')
                .then(Business.update(res)(req.params))
                .catch(err => res.status(500).json(err)),
        listAll: (req, res) => Persistence.findAll(res)(req.params, req.body),
        listOne: (req, res) => Persistence.findOne(res)(req.params, req.body),
        delete: (req, res) => Persistence.remove(res)(req.params)
    }
}
