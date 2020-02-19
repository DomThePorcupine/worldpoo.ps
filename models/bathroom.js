'use strict';
module.exports = (sequelize, DataTypes) => {
    const Bathroom = sequelize.define('Bathroom', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {});
    Bathroom.associate = function (models) {
        // associations can be defined here
        Bathroom.hasMany(models.Stall, { as: 'stalls', onDelete: 'cascade', hooks: true });
    };
    return Bathroom;
};
