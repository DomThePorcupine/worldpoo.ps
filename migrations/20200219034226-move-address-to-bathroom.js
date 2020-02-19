'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        await queryInterface.removeColumn('Stalls', 'address');

        await queryInterface.addColumn('Bathrooms', 'address', Sequelize.DataTypes.STRING);
    },

    down: async (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.dropTable('users');
        */
        await queryInterface.removeColumn('Bathrooms', 'address');

        await queryInterface.addColumn('Stalls', 'address', Sequelize.DataTypes.STRING);
    }
};
