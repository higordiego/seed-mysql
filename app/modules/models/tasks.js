const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const Task = sequelize.define('Task', {
        name: {
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
        status: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        },
        evaluate: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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

    Task.associate = (models) => {
        Task.belongsTo(models.Startup, {foreignKey: {allowNull: false}})
        Task.belongsTo(models.Challenges, {foreignKey: {allowNull: false}})
    }

    return Task
}
