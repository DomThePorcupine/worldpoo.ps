'use strict';
module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        score: {
            type: DataTypes.INTEGER,
            allowedNull: false,
        },
    }, {});
    Rating.associate = function (models) {
        // associations can be defined here
        Rating.belongsTo(models.Stall, { foreignKey: 'StallId' });
        Rating.belongsTo(models.User, { foreignKey: 'UserId' });
    };
    return Rating;
};
