module.exports = app => {
    const url = `${app.url}/startups`
    const Controller = require('../controllers/startup')(app)
    const Validate = require('../validates/startup')(app)

    app.route(url)
        .get(Controller.listAll)
        .post(Validate.create, Controller.create)

    app.route(`${url}/:_id`)
        .get(app.jwt, Validate.isId, Controller.listOne)
        .put(app.jwt, Validate.isId, Validate.update, Controller.update)
        .delete(app.jwt, Validate.isId, Controller.delete)

    app.route(`${url}/all`)
        .post(Controller.listOneAllStartups)

    app.route(`${url}/all/:id`)
        .get(app.jwt, Validate.isId, Controller.listAllStartupsId)
}
