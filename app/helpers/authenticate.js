const crypto = require('./crypto')

const condition = require('sequelize').Op

const authenticate = (User, Validate, Business, Errors) =>
    (req, res, next) => {
        const exclude = [
            'password',
            'created_at',
            'updated_at',
            'master',
            'token',
            'forgot',
            'active'
        ]
        const query = {
            attributes: {
                exclude
            },
            where: {
                [condition.and]: [{
                    email: req.body.email
                }, {
                    password: crypto.md5(req.body.password)
                }]
            }
        }

        Validate.searchQuery(User, query)
            .then(Validate.isEmptyObject(res, Errors.notAuthorization))
            .then(Business.authenticate(res))
            .catch(err => res.status(500).json(err))
    }

module.exports = {
    authenticate
}
