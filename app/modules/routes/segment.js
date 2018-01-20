module.exports = app => {
    const url = `${app.url}/segments`
    const Controller = require('../controllers/segments')(app)
    const Validate = require('../validates/segments')(app)

    app.route(url)
        .get(app.jwt, Controller.listAll)
        .post(Validate.create, Controller.create)

    app.route(`${url}/:id`)
        .get(app.jwt, Validate.isId, Controller.listOne)
        .put(app.jwt, Validate.isId, Validate.update, Controller.update)
        .delete(app.jwt, Validate.isId, Controller.delete)
}
