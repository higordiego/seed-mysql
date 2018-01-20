module.exports = app => {
    const Regex = require('../../helpers/regex')
    const Generator = require('../../helpers/generator')(app)
    const errorSistem = require('../../errors/system/error')
    const crypto = require('../../helpers/crypto')
    const Helper = require('../../helpers/validate')

    const cryptoPassword = password => crypto.md5(password)
    const isPassword = object => object.password ? cryptoPassword(object.password) : null
    const isPhone = object => object.phone ? Helper.tratmentPhone(object.phone) : null

    const isPicture = object => object.avatar ? object.file.filename : null

    return {
        create: (object) => new Promise((resolve, reject) => {
            try {
                object.phone = Regex.phone(object.phone)

                object.phone = `+55${object.phone}`
                
                const phone = Helper.tratmentPhone(object.phone, Regex)

                object.ddd = phone.ddd
                object.ddi = phone.ddi
                object.number = phone.number
                object.name = object.name
                object.active = Generator.active()
                object.type_user_id = 1
                object.password = isPassword(object)
                resolve(object)
            } catch (err) {
                reject(errorSistem.dataProcessing)
            }
        }),
        update: (object) => new Promise((resolve, reject) => {
            try {
                object.phone = `+55${object.phone}`
                const validatePhone = isPhone(object)
                console.log(validatePhone)
                if (validatePhone !== null) {
                    object.ddi = validatePhone.ddi
                    object.ddd = validatePhone.ddd
                    object.number = validatePhone.number
                }
                const validatePassword = isPassword(object)
                if (validatePassword !== null) {
                    object.password = validatePassword
                }
                const validatePicture = isPicture(object)
                if (validatePicture !== null) {
                    object.avatar = validatePicture
                }
                console.log(object)
                resolve(object)
            } catch (err) {
                console.log('erro', err)
                reject(errorSistem.tratmentUpdateUser)
            }
        })
    }
}
