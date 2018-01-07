const phoneClean = phone => phone.replace(/[^0-9]+/g, '')
const clean = object => object.replace(/[\.-]/g, '')
const ddi = phone => phone.substring(0, 3)
const ddd = phone => phone.substring(3, 5)
const phone = phone => phone.substring(4, 14)

const cep = cep => {
    cep = cep.replace(/\D/g, '')
    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2')
    return cep
}

module.exports = {
    phoneClean,
    ddi,
    ddd: ddd,
    clean,
    phone,
    cep
}
