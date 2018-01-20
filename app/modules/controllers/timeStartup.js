module.exports = app => {
    const TimeStartup = app.datasource.models.TimeStartup
    const Time = app.datasource.models.Time
    const People = app.datasource.models.People
    const Persistence = require('../../helpers/persistence')(TimeStartup)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'time_id', 'startup_id')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'time_id', 'startup_id')(body)
            Persistence.update(req.params)(body)
        },
        listAll: (req, res) => {
            const query = {
                where: {},
                include: [
                    {
                        model: Time,
                        include: [
                            {
                                model: People
                            }
                        ]
                    }
                ]
            }
            Persistence.listAllQuery(query, res)
        },
        listOne: (req, res) => Persistence.listOne(req.params, res),
        delete: (req, res) => Persistence.delete(req.params)
    }
}
