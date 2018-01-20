module.exports = app => {
    const url = `${app.url}/tasks`
    const Controller = require('../controllers/tasks')(app)
    const Validate = require('../validates/tasks')(app)

    app.route(url)
        .get(Controller.listAll)
        .post(Validate.create, Controller.create)

    app.route(`${url}/:id`)
        .get(app.jwt, Validate.isId, Controller.listOne)
        .put(app.jwt, Validate.isId, Validate.update, Controller.update)
        .delete(app.jwt, Validate.isId, Controller.delete)
}
