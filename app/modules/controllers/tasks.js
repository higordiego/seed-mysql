module.exports = app => {
    const Tasks = app.datasource.models.Task
    const Time = app.datasource.models.Time
    const TimeStartup = app.datasource.models.TimeStartup
    const People = app.datasource.models.People
    const Startup = app.datasource.models.Startup
    const Business = require('../business/tasks')(app)
    const Persistence = require('../../helpers/persistence')(Tasks)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'time_startup_id', 'status', 'startup_id')(body)
            Business.listTimeStartup(body)
                .then(Business.customerQuery)
                .then(resp => {
                    resp.map(value => {
                        Tasks.create(value)
                            .then()
                            .catch()
                    })
                    res.status(201).json()
                })
                .catch(err => console.log(err))
        },
        update: (req, res) => {
            delete req.body.id
            Persistence.update(req.params, res)(req.body)
        },
        listAll: (req, res) => {
            const query = {
                where: {},
                include: [
                    {
                        model: TimeStartup,
                        include: [{
                            model: Time,
                            include: [{
                                model: People
                            }]
                        },
                        {
                            model: Startup
                        }
                        ]
                    }]
            }
            Persistence.listAllQuery(query, res)
        },
        listTaksStartup: (req, res) => {
            const query = {
                where: {},
                include: [
                    {
                        model: TimeStartup,
                        include: [{
                            model: Time,
                            include: [{
                                model: People
                            }]
                        },
                        {
                            model: Startup,
                            where: {id: req.params.startup_id}
                        }
                        ]
                    }
                ]
            }
            console.log(req.params)
            Persistence.listAllQuery(query, res)
        },
        listOne: (req, res) => Persistence.listOne(req.params, res),
        listConditionComplete: (req, res) => {
            const query = {
                where: {
                    $and: [
                        {
                            status: true
                        },
                        {
                            aprove: false
                        }
                    ]
                },
                include: [{
                    model: TimeStartup,
                    include: [
                        {
                            model: Time,
                            include: [{
                                model: People
                            }]
                        },
                        {
                            model: Startup
                        }
                    ]
                }]
            }
            Persistence.listAllQuery(query, res)
        },
        listConditionAprove: (req, res) => {
            const query = {
                where: {
                    $and: [
                        {
                            status: true
                        },
                        {
                            aprove: true
                        }
                    ]
                },
                include: [{
                    model: TimeStartup,
                    include: [{
                            model: Time,
                            include: [{
                                model: People
                            }]
                        },
                        {
                            model: Startup
                        }
                    ]
                }]
            }
            Persistence.listAllQuery(query, res)
        },
        delete: (req, res) => Persistence.delete(req.params)
    }
}