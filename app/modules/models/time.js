const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const Time = sequelize.define('Time', {
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        hooks: {
            beforeValidate: (model, options) => {
                model.created_at = moment().utc(-3).toISOString()
                model.updated_at = moment().utc(-3).toISOString()
                return model
            }
        }
    })

    Time.associate = (models) => {
        Time.belongsTo(models.User, {foreignKey: {allowNull: false}})
        Time.hasMany(models.People, {onDelete: 'CASCADE', hooks: true})
        Time.hasMany(models.TimeStartup, {onDelete: 'CASCADE', hooks: true})
    }

    return Time
}
