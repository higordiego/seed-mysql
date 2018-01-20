const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const Startup = sequelize.define('Startup', {
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataType.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        valueation: {
            type: DataType.DECIMAL(),
            default: 0.0
        },
        investiment: {
            type: DataType.DECIMAL(),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        avatar: {
            type: DataType.STRING
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
        Startup.hasMany(models.SegmentEnterprise, {onDelete: 'CASCADE', hooks: true})
        Startup.belongsTo(models.User, {foreignKey: {allowNull: false}})
        Startup.belongsTo(models.SegmentEnterprise)
        Startup.hasMany(models.Task, {onDelete: 'CASCADE', hooks: true})
    }

    return Startup
}
