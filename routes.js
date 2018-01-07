const PATH = './app/modules/routes'
const fs = require('fs')

module.exports = app => {
    fs.readdirSync('./app/modules/routes/')
        .filter(f => !f.startsWith('.'))
        .forEach((el, i) => {
            require(`${PATH}/${el}`)(app)
        })
}
