const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const ChallengesStartup = sequelize.define('ChallengesStartup', {
        
    }, {
        hooks: {
            beforeValidate: (model, options) => {
                model.created_at = moment().utc(-3).toISOString()
                model.updated_at = moment().utc(-3).toISOString()
                return model
            }
        }
    })

    ChallengesStartup.associate = (models) => {
        ChallengesStartup.belongsTo(models.Startup, {foreignKey: {allowNull: false}})
        ChallengesStartup.belongsTo(models.Challenges, {foreignKey: {allowNull: false}})
    }

    return ChallengesStartup
}
