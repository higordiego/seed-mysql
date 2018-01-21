const callbackObject = require('./returnObject')
module.exports = Model => ({
    create: (res) => (data) => Model.create(data)
        .then(result => callbackObject.returnCreateSuccess(result, res))
        .catch(error => callbackObject.returnError(error, res)),

    listAll: (res) => Model.findAll({})
        .then(result => callbackObject.returnListSuccess(result, res))
        .catch(error => callbackObject.returnError(error, res)),

    listAllQueryWithJoin: (query, res) => Model.findAll({query, include: { all: true }})
        .then(result => callbackObject.returnListSuccess(result, res))
        .catch(error => callbackObject.returnError(error, res)),

    listAllQuery: (query, res) => Model.findAll(query)
        .then(result => callbackObject.returnListSuccess(result, res))
        .catch(error => callbackObject.returnError(error, res)),
        
    listAllOneQuery: (query, res) => Model.findOne(query)
        .then(result => callbackObject.returnListSuccess(result, res))
        .catch(error => callbackObject.returnError(error, res)),

    listOne: (query, res) => Model.findOne({where: query})
        .then(result => callbackObject.returnListSuccess(result, res))
        .catch(error => callbackObject.returnError(error, res)),

    listOneWithJoin: (query, res) => Model.findOne({
        where: query,
        include: { all: true }
    })
        .then(result => callbackObject.returnListSuccess(result, res))
        .catch(error => callbackObject.returnError(error, res)),

    findAndCountAll: (query, res) => Model.findAndCountAll(query)
        .then(result => callbackObject.returnListSuccess(result, res))
        .catch(error => callbackObject.returnError(error, res)),

    listAllWithJoin: (res) => Model.findAll({where: {}, include: {all: true}})
        .then(result => callbackObject.returnListSuccess(result, res))
        .catch(error => callbackObject.returnError(error, res)),

    listOneAllWithJoin: (query, res) => Model.findAll({
        where: query,
        include: { all: true }
    })
        .then(result => callbackObject.returnListSuccess(result, res))
        .catch(error => callbackObject.returnError(error, res)),

    delete: (query, res) => Model.destroy({ where: query })
        .then(result => callbackObject.returnDelete(result, res))
        .catch(error => callbackObject.returnError(error, res)),

    update: (query, res) => (mod) => Model.update(mod, { where: query })
        .then(result => callbackObject.returnUpdate(result, res))
        .catch(error => callbackObject.returnError(error, res)),

    activeCode: (query, mod, res) => Model.update(mod, { where: query })
        .then(result => callbackObject.returnUpdateActive(result, res))
        .catch(error => callbackObject.returnError(error, res))

})
