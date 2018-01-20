module.exports = app => {
    const Startups = app.datasource.models.Startup
    const StartupSegment = app.datasource.models.StartupSegment
    const Segment = app.datasource.models.Segment
    const User = app.datasource.models.User
    const Persistence = require('../../helpers/persistence')(Startups)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            console.log(body)
            Validate.validateBody(req.body, 'title', 'description', 'investiment', 'user_id', 'problematic')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'title', 'description', 'investiment', 'user_id', 'problematic')(body)
            Persistence.update(req.params)(body)
        },
        listAll: (req, res) => {
            const query = {
                where: {},
                include: [
                    {
                        model: User
                    }, {
                        model: StartupSegment,
                        include: [
                            {
                                model: Segment
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
