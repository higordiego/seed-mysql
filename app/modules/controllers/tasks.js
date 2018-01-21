module.exports = app => {
    const Tasks = app.datasource.models.Task
    const Time = app.datasource.models.Time
    const TimeStartup = app.datasource.models.TimeStartup
    const People = app.datasource.models.People
    const Startup = app.datasource.models.Startup
    const Persistence = require('../../helpers/persistence')(Tasks)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'time_startup_id', 'status')(body)
            Persistence.create(res)(body)
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description', 'time_startup_id', 'status', 'aprove')(body)
            Persistence.update(req.params)(body)
        },
        listAll: (req, res) => {
            const query = {
                where: {},
                include: [
                    {
                        model: TimeStartup,
                        include: [
                            {
                                model: Time,
                                include: [
                                    {
                                        model: People
                                    }
                                ]
                            },
                            {
                                model: Startup
                            }
                        ]
                    }
                ]
            }
            Persistence.listAllQuery(query, res)
        },
        listOne: (req, res) => Persistence.listOne(req.params, res),
        listConditionComplete: (req, res) => {
            const query = {
                where: {
                    $and: [
                        {status: true},
                        {aprove: false}
                    ]
                },
                include: [
                    {
                        model: TimeStartup,
                        include: [
                            {
                                model: Time,
                                include: [
                                    {
                                        model: People
                                    }
                                ]
                            },
                            {
                                model: Startup
                            }
                        ]
                    }
                ]
            }
            Persistence.listAllQuery(query, res)
        },
        listConditionAprove: (req, res) => {
            const query = {
                where: {
                    $and: [
                        {status: true},
                        {aprove: true}
                    ]
                },
                include: [
                    {
                        model: TimeStartup,
                        include: [
                            {
                                model: Time,
                                include: [
                                    {
                                        model: People
                                    }
                                ]
                            },
                            {
                                model: Startup
                            }
                        ]
                    }
                ]
            }
            Persistence.listAllQuery(query, res)
        },
        delete: (req, res) => Persistence.delete(req.params)
    }
}
