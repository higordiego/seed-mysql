module.exports = app => {
    const url = `${app.url}/timestartups`
    const Controller = require('../controllers/timeStartup')(app)
    const Validate = require('../validates/timeStartup')(app)

    app.route(url)
        .get(Controller.listAll)
        .post(Validate.create, Controller.create)

    app.route(`${url}/:id`)
        .get(app.jwt, Validate.isId, Controller.listOne)
        .put(app.jwt, Validate.isId, Validate.update, Controller.update)
        .delete(app.jwt, Validate.isId, Controller.delete)

    app.route(`${url}/all`)
        .post(Controller.listOneAllStartups)
}
