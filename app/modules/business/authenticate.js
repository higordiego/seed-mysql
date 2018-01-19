module.exports = app => {
    const Generator = require('../../helpers/generator')(app)
    const SendEmail = require('../../helpers/sendEmail')(app)
    const Errors = require('../../errors/system/error')
    const Users = app.datasource.models.User

    const isUpdate = (tokenGenerator, res, user) => (object) => (object[0])
        ? res.status(200).json({token: tokenGenerator, user})
        : res.status(400).json([Errors.dataProcessing])

    return {
        authenticate: (res) => (object) => {
            const template = require('../../templates/first-html')
            try {
                const payload = { id: object.id, name: object.name, master: object.master }
                const tokenGenerator = Generator.token(payload)
                if (object.fisrt) {
                    const description = Errors.firstAccess
                    SendEmail.first(object, template, description)
                }
                const query = {where: {id: object.id}}
                const mod = {token: tokenGenerator, first: false}

                Users.update(mod, query)
                    .then(isUpdate(tokenGenerator, res, object))
                    .catch(() => res.status(400).json([Errors.dataProcessing]))
            } catch (err) {
                console.log(err)
                res.status(400).json([Errors.dataProcessing])
            }
        }
    }
}
