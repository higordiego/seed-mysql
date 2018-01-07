module.exports = (app) => {
    return {
        send: (User, Template, Description) => {
            const nodemailer = require('nodemailer')
            const template = Template

            const config = {
                remetente: ' <no-reply@teste.com>',
                assunto: Description
            }

            const html = template(User)

            const transporte = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'revisacarnissan@gmail.com',
                    pass: '<r66189184r>'
                }
            })
            transporte.sendMail({
                from: config.remetente,
                to: User.email,
                subject: config.assunto,
                html: html
            }, (err) => {
                if (err) throw err
            })
        }
    }
}
