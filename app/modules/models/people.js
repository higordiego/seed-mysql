const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const People = sequelize.define('People', {
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
        aprove: {
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

    People.associate = (models) => {
        People.belongsTo(models.Time, {foreignKey: {allowNull: false}})
    }

    return People
}
