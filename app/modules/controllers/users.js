module.exports = app => {
    const User = app.datasource.models.User
    const Persistence = require('../../helpers/persistence')(User)
    const Business = require('../business/users')(app)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'email', 'phone', 'password')(body)
            Business.create(body)
                .then(Persistence.create(res))
                .catch(err => res.status(500).json(err))
        },
        update: (req, res) => {
            // const body = {}
            // Validate.validateBody(req.body, 'name', 'email', 'phone', 'password')(body)
            Business.update(req.body)
                .then(Persistence.update(req.params, res))
                .catch(err => console.log(err))
        },
        listAll: (req, res) => {
            const query = {
                where: {},
                include: {all: true}
            }
            Persistence.listAllQuery(query, res)
        },
        listOne: (req, res) => Persistence.listOneWithJoin(req.params, res),
        delete: (req, res) => Persistence.delete(req.params)
    }
}
