const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const Users = sequelize.define('User', {
        name: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },

        token: {
            type: DataType.TEXT
        },

        forgot: {
            type: DataType.TEXT
        },

        active: {
            type: DataType.TEXT
        },

        number: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        ddd: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        ddi: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        email: {
            type: DataType.STRING,
            unique: {
                args: true,
                msg: 'Este e-mail já está sendo usado'
            },
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        avatar: {
            type: DataType.STRING
        },

        alias: {
            type: DataType.STRING
        },

        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        first: {
            type: DataType.BOOLEAN,
            defaultValue: true
        },

        status: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
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

    Users.associate = (models) => {
        Users.belongsTo(models.TypesUser, {foreignKey: {allowNull: false}})
        Users.hasMany(models.SegmentUser, {onDelete: 'CASCADE', hooks: true})
        Users.hasMany(models.Startup, {onDelete: 'CASCADE', hooks: true})
        Users.hasMany(models.Challenges, {onDelete: 'CASCADE', hooks: true})
        Users.hasMany(models.Enterprise, {onDelete: 'CASCADE', hooks: true})
    }

    return Users
}
