const pagarme = require('pagarme')

const key = require('../config/urls').pagarme.tester

const pagarmeApi = {
    connect: pagarme.client.connect({ api_key: key })
}

module.exports = ({
    card: data => pagarmeApi.connect.then(client => client.cards.create(data)),
    bank: data => pagarmeApi.connect.then(client => client.bankAccounts.create(data)),
    ticket: data => pagarmeApi.connect.then(client => client.transactions.create(data)),
    calculateSignature: (header, data) => pagarme.postback.calculateSignature(header, data),
    reversalTransaction: data => pagarmeApi.connect.then(client => client.transactions.refund(data)),
    verifySignature: (header, data, hash) => pagarme.postback.verifySignature(header, data, hash),
    cardCredit: data => pagarmeApi.connect.then(client => client.transactions.create(data))
})