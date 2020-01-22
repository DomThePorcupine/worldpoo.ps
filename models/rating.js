'use strict';
module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        score: {
            type: DataTypes.INTEGER,
            allowedNull: false,
        },
        review: DataTypes.STRING,
    }, {});
    Rating.associate = function (models) {
        // associations can be defined here
        Rating.belongsTo(models.Stall, { as: 'stall' });
        Rating.belongsTo(models.User);
    };
    return Rating;
};
