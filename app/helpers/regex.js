
const phoneClean = phone => phone.replace(/[^0-9]+/g, '')
const ddi = phone => phone.substring(0, 2)
const ddd = phone => phone.substring(2, 4)
const phone = phone => phone.substring(4, 14)

const cep = cep => {
    cep = cep.replace(/\D/g, '')
    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2')
    return cep
}

module.exports = {
    phoneClean,
    ddi,
    ddd,
    phone,
    cep
}
