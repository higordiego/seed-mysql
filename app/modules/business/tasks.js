module.exports = app => {
    const TimeStartup = app.datasource.models.TimeStartup
    return {
        listTimeStartup: object =>
            new Promise((resolve, reject) => {
                TimeStartup.findAll(
                    {
                        where: {
                            startup_id: object.startup_id
                        },
                        raw: true
                    })
                    .then(time => resolve(Object.assign({
                        timeStartup: time,
                        body: object
                    }, {})))
                    .catch(reject)
            }),
        customerQuery: object =>
            new Promise((resolve, reject) => {
                try {
                    let query = object.timeStartup.map((value, index) => {
                        return {
                            time: value.time_id,
                            description: object.body.description,
                            name: object.body.name,
                            time_startup_id: value.id
                        }
                    })
                    resolve(query)
                } catch (err) {
                    console.log(err)
                    reject(err)
                }
            })
    }
}