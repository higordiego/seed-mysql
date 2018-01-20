const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const Challenges = sequelize.define('Challenges', {
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

    Challenges.associate = (models) => {
        Challenges.belongsTo(models.User, {foreignKey: {allowNull: false}})
        Challenges.belongsTo(models.Segment, {foreignKey: {allowNull: false}})
    }

    return Challenges
}
