'use strict';
module.exports = (sequelize, DataTypes) => {
    const Story = sequelize.define('Story', {
        username: DataTypes.STRING,
        storyText: DataTypes.STRING,
    }, {});
    Story.associate = function (models) {
        // associations can be defined here
        Story.belongsTo(models.User);
    };
    return Story;
};
