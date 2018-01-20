module.exports = app => {
    const Startups = app.datasource.models.Startup
    const SegmentEnterprise = app.datasource.models.SegmentEnterprise
    const Segment = app.datasource.models.Segment
    const User = app.datasource.models.User
    const Persistence = require('../../helpers/persistence')(Startups)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            console.log(body)
            Validate.validateBody(req.body, 'name', 'description', 'valuation', 'investiment', 'user_id')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'valuation', 'investiment', 'user_id')(body)
            Persistence.update(req.params)(body)
        },
        listAll: (req, res) => {
            const query = {
                where: {},
                include: [
                    {
                        model: User
                    },
                    {
                        model: SegmentEnterprise,
                        include: [
                            {
                                model: Segment
                            },
                            {
                                model: Startups
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
