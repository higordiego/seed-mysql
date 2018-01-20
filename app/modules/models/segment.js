const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const Segment = sequelize.define('Segment', {
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
    
    Segment.associate = (models) => {
        Segment.hasMany(models.Challenges, {onDelete: 'CASCADE', hooks: true})
    }

    return Segment
}
