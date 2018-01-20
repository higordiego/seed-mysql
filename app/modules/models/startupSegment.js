const moment = require('moment')
module.exports = (sequelize, DataType) => {
    const StartupSegment = sequelize.define('StartupSegment', {
        
    }, {
        hooks: {
            beforeValidate: (model, options) => {
                model.created_at = moment().utc(-3).toISOString()
                model.updated_at = moment().utc(-3).toISOString()
                return model
            }
        }
    })

    StartupSegment.associate = (models) => {
        StartupSegment.belongsTo(models.Startup, {foreignKey: {allowNull: false}})
        StartupSegment.belongsTo(models.Segment, {foreignKey: {allowNull: false}})
    }

    return StartupSegment
}
