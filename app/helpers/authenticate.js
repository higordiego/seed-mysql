const crypto = require('./crypto')

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
                $and: [{
                    email: req.body.email
                }, {
                    password: crypto.md5(req.body.password)
                }]
            }
        }

        console.log(req.body)

        Validate.searchQuery(User, query)
            .then(Validate.isEmptyObject(res, Errors.notAuthorization))
            .then(Business.authenticate(res))
            .catch(err => res.status(400).json(err))
    }

module.exports = {
    authenticate
}
