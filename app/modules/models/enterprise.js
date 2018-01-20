const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const Enterprise = sequelize.define('Enterprise', {
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

    Enterprise.associate = (models) => {
        Enterprise.belongsTo(models.User, {foreignKey: {allowNull: false}})
        Enterprise.belongsTo(models.Enterprise)
        Enterprise.hasMany(models.SegmentEnterprise, {onDelete: 'CASCADE', hooks: true})
    }

    return Enterprise
}
