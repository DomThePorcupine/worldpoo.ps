'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tale = sequelize.define('Tale', {
        username: DataTypes.STRING,
        taleText: DataTypes.STRING,
    }, {});
    Tale.associate = function (models) {
        // associations can be defined here
        Tale.belongsTo(models.User);
        Tale.belongsTo(models.Stall, { as: 'stall' });
    };
    return Tale;
};
