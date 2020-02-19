'use strict';
module.exports = (sequelize, DataTypes) => {
    const Metric = sequelize.define('Metric', {
        signups: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        ratings: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        taleVotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        talesCreated: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        codesScanned: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, {});
    Metric.associate = function (models) {
        // associations can be defined here
    };
    return Metric;
};
