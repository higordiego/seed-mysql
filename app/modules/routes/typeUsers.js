module.exports = app => {
    const url = `${app.url}/typeusers`
    const Controller = require('../controllers/typeUsers')(app)
    const Validate = require('../validates/typeUsers')(app)

    app.route(url)
        .get(app.jwt, Controller.listAll)
        .post(Validate.create, Controller.create)

    app.route(`${url}/:_id`)
        .get(app.jwt, Validate.isId, Controller.listOne)
        .put(app.jwt, Validate.isId, Validate.update, Controller.update)
        .delete(app.jwt, Validate.isId, Controller.delete)
}
