module.exports = app => {
    const url = `${app.url}/users`
    const Controller = require('../controllers/users')(app)
    const Validate = require('../validates/users')(app)

    app.route(url)
        .get(Controller.listAll)
        .post(Validate.create, Controller.create)

    app.route(`${url}/:_id`)
        .get(Validate.isId, Controller.listOne)
        .put(Validate.isId, Validate.update, Controller.update)
        .delete(Validate.isId, Controller.delete)
}
