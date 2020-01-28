'use strict';
module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define('Vote', {}, {});
    Vote.associate = function (models) {
        // associations can be defined here
        Vote.belongsTo(models.Tale, { as: 'tale' });
        Vote.belongsTo(models.User);
    };
    return Vote;
};
