module.exports = app => {
    const url = `${app.url}/times`
    const Controller = require('../controllers/times')(app)
    const Validate = require('../validates/times')(app)

    app.route(url)
        .get(Controller.listAll)
        .post(Validate.create, Controller.create)

    app.route(`${url}/:id`)
        .get(app.jwt, Validate.isId, Controller.listOne)
        .put(app.jwt, Validate.isId, Validate.update, Controller.update)
        .delete(app.jwt, Validate.isId, Controller.delete)

    app.route(`${url}/startup/:startup_id`)
        .get(app.jwt, Validate.isId, Controller.listOne)
}
