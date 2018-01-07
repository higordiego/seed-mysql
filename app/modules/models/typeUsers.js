const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const TypesUser = sequelize.define('TypesUser', {
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        alias: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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

    TypesUser.associate = (models) => {
        TypesUser.hasMany(models.User, {onDelete: 'CASCADE', hooks: true})
    }

    return TypesUser
}
