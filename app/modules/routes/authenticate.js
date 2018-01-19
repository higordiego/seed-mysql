module.exports = app => {
    const url = `${app.url}/authenticate`
    const Controller = require('../controllers/authenticate')(app)
    const Validate = require('../validates/authenticate')(app)

    app.route(`${url}`)
        .post(Validate.authenticate, Controller.authenticate)

    app.route(`${url}/logout`)
        .post(app.jwt, Controller.logout)
}
