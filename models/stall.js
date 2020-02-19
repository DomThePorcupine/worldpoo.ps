'use strict';
module.exports = (sequelize, DataTypes) => {
    const Stall = sequelize.define('Stall', {
        name: DataTypes.STRING,
    }, {});
    Stall.associate = function (models) {
        // associations can be defined here
        Stall.hasMany(models.Tale, { as: 'tales', onDelete: 'cascade', hooks: true });
        Stall.hasMany(models.Rating, { as: 'ratings', onDelete: 'cascade', hooks: true });
        Stall.belongsTo(models.Bathroom, { foreignKey: 'BathroomId', as: 'bathroom' });
    };
    return Stall;
};
