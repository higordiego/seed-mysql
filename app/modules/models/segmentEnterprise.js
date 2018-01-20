const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const SegmentEnterprise = sequelize.define('SegmentEnterprise', {
    }, {
        hooks: {
            beforeValidate: (model, options) => {
                model.created_at = moment().utc(-3).toISOString()
                model.updated_at = moment().utc(-3).toISOString()
                return model
            }
        }
    })

    SegmentEnterprise.associate = (models) => {
        SegmentEnterprise.belongsTo(models.Startup)
        SegmentEnterprise.belongsTo(models.Segment, {foreignKey: {allowNull: false}})
        SegmentEnterprise.belongsTo(models.Enterprise)
    }

    return SegmentEnterprise
}
