const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const TimeStartup = sequelize.define('TimeStartup', {
        
    }, {
        hooks: {
            beforeValidate: (model, options) => {
                model.created_at = moment().utc(-3).toISOString()
                model.updated_at = moment().utc(-3).toISOString()
                return model
            }
        }
    })

    TimeStartup.associate = (models) => {
        TimeStartup.belongsTo(models.Startup, {foreignKey: {allowNull: false}})
        TimeStartup.belongsTo(models.Time, {foreignKey: {allowNull: false}})
        TimeStartup.hasMany(models.Task, {onDelete: 'CASCADE', hooks: true})
    }

    return TimeStartup
}
