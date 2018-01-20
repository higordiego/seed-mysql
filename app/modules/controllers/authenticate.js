module.exports = app => {
    const Errors = require('../../errors/system/error')
    const Validate = require('../../helpers/validate')
    const Help = require('../../helpers/authenticate')
    const User = app.datasource.models.User
    const Business = require('../business/authenticate')(app)

    return {
        authenticate: Help.authenticate(User, Validate, Business, Errors),
        logout: (req, res) => res.json(req.body)
    }
}