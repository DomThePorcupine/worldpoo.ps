'use strict';
module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define('Vote', {
        vote: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {});
    Vote.associate = function (models) {
        // associations can be defined here
        Vote.belongsTo(models.Tale, { foreignKey: 'TaleId' });
        Vote.belongsTo(models.User, { foreignKey: 'UserId' });
    };
    return Vote;
};
