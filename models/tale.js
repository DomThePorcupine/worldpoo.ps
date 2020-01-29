'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tale = sequelize.define('Tale', {
        username: DataTypes.STRING,
        // eslint-disable-next-line new-cap
        taleText: DataTypes.STRING(560),
        currentScore: {
            type: DataTypes.INTEGER,
            allowedNull: false,
            defaultValue: 0,
        },
    }, {});
    Tale.associate = function (models) {
        // associations can be defined here
        Tale.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
        Tale.belongsTo(models.Stall, { foreignKey: 'StallId', as: 'stall' });
    };
    return Tale;
};
