const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const Time = sequelize.define('Time', {
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        avatar: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        experiences: {
            type: DataType.TEXT,
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
        Time.belongsTo(models.Startup, {foreignKey: {allowNull: false}})
    }

    return Time
}
