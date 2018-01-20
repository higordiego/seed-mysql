const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const SegmentUser = sequelize.define('SegmentUser', {
    }, {
        hooks: {
            beforeValidate: (model, options) => {
                model.created_at = moment().utc(-3).toISOString()
                model.updated_at = moment().utc(-3).toISOString()
                return model
            }
        }
    })

    SegmentUser.associate = (models) => {
        SegmentUser.belongsTo(models.User, {foreignKey: {allowNull: false}})
        SegmentUser.belongsTo(models.Segment, {foreignKey: {allowNull: false}})
        SegmentUser.hasMany(models.Challenges, {onDelete: 'CASCADE', hooks: true})
    }

    return SegmentUser
}

