'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: DataTypes.STRING,
        vip: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {});
    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.Tale, { onDelete: 'cascade', hooks: true });
        User.hasMany(models.Rating, { onDelete: 'cascade', hooks: true });
    };
    return User;
};
