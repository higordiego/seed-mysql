module.exports = (app) => {
    const jwt = require('jsonwebtoken')
    const key = require('../config/urls').token
    const Errors = require('../errors/system/error')
    const Validate = require('./validate')
    const User = app.datasource.models.User
    return {
        validate: (req, res, next) => {
            const token = req.headers['x-access-token']
            const query = {
                where: {
                    token: {
                        $eq: token
                    }
                },
                raw: true
            }
            Validate.isToken(token, Errors.tokenRequired)
                .then(Validate.validateToken(Errors.tokenUser, jwt, key, Validate.isToken))
                .then(Validate.searchQuery(User, query))
                .then(Validate.isLogged(req, res, next, Errors.tokenUser))
                .catch(err => res.status(401).json([err]))
        }
    }
}
