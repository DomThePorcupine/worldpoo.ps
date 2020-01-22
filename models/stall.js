'use strict';
module.exports = (sequelize, DataTypes) => {
    const Stall = sequelize.define('Stall', {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
    }, {});
    Stall.associate = function (models) {
        // associations can be defined here
        Stall.hasMany(models.Tale, { as: 'tales' });
        Stall.hasMany(models.Rating, { as: 'ratings' });
    };
    return Stall;
};
