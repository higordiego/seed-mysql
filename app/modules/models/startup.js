const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const Startup = sequelize.define('Startup', {
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        problematic: {
            type: DataType.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        investiment: {
            type: DataType.DECIMAL(),
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

    Startup.associate = (models) => {
        Startup.belongsTo(models.User, {foreignKey: {allowNull: false}})
        Startup.hasMany(models.StartupSegment, {onDelete: 'CASCADE', hooks: true})
        Startup.hasMany(models.TimeStartup, {onDelete: 'CASCADE', hooks: true})
    }

    return Startup
}
