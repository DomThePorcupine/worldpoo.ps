'use strict';
module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define('Vote', {}, {});
    Vote.associate = function (models) {
        // associations can be defined here
        Vote.belongsTo(models.Tale, { foreignKey: 'TaleId' });
        Vote.belongsTo(models.User, { foreignKey: 'UserId' });
    };
    return Vote;
};
