module.exports = ({
    isEmptyObject: (res, Error) => object =>
        new Promise((resolve, reject) => (object) ? resolve(object) : reject(Error)),

    isEmptyObjectNext: (res, next, Error) => object =>
        (object) ? res.status(400).json(Error) : next(),

    reject: (res) => (err) => res.status(400).json(err),

    searchQuery: (Model, query) => Model.findOne(query),

    isUpload: (file, avatar, next) => (helpRemoveOld) => {
        if (file) helpRemoveOld.remove(avatar)
        next()
    },
    isNumber: (number, res, next, Error) => !isNaN(number) ? next() : res.status(400).json(Error),

    requestRequired: (req, required, Errors) => {
        required.map((key, index) => {
            req.assert(required[index], Errors[key]).notEmpty()
        })
        return req.validationErrors()
    },
    requestOptional: (req, required, Errors) => {
        required.map((key, index) => {
            req.assert(required[index], Errors[key]).optional()
        })
        return req.validationErrors()
    },

    validateBody: (object, ...body) => returnObject => body.map(key => {
        returnObject[key] = object[key]
        return returnObject
    }),

    tratmentPhone: (phone, Regex) => {
        const object = Regex.phoneClean(phone)
        return {
            number: Regex.phone(object),
            ddi: Regex.ddi(phone),
            ddd: Regex.ddd(phone)
        }
    },

    isToken: (token, Error) => new Promise((resolve, reject) => token ? resolve(token) : reject(Error)),

    validateToken: (Error, jwt, key) => (token) =>
        new Promise((resolve, reject) => {
            try {
                const decoded = jwt.decode(token, key)
                decoded ? resolve(decoded) : reject(Error)
            } catch (err) {
                reject(Error)
            }
        }),

    isLogged: (req, res, next, Error) => (object) => {
        if (object) {
            req.user = object.dataValues
            next()
        } else {
            res.status(401).json([Error])
        }
    }
})
