module.exports = app => {
    const Crypto = require('./../../helpers/crypto')
    const Regex = require('../../helpers/regex')
    const Helper = require('../../helpers/validate')
    const Generator = require('../../helpers/generate')
    const errorSistem = require('../../errors/system/error')
    const cryptoPassword = password => Crypto.md5(password)
    const isPassword = object => object.password ? cryptoPassword(object.password) : null

    return {
        create: user => new Promise((resolve, reject) => {
            try {
                const phone = Helper.tratmentPhone(user.phone, Regex)
                user.ddd = phone.ddd
                user.ddi = phone.ddi
                user.number = phone.number
                user.name = user.name
                user.active = Generator.active()
                user.password = isPassword(user)
                resolve(user)
            } catch (err) {
                reject(errorSistem.dataProcessing)
            }
        }),
        update: user => new Promise((resolve, reject) => {
            try {
                if (user.password) user.password = cryptoPassword(user.password)
                resolve(user)
            } catch (err) {
                reject(errorSistem.dataProcessing)
            }
        })
    }
}
