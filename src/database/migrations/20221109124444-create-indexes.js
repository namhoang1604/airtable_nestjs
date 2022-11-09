'use strict';

const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addIndex('AirtableModels', ['parents'], {
        fields: 'parents',
        using: 'GIN',
        operator: 'array_ops',
        transaction,
      });
      await queryInterface.addIndex('AirtableModels', ['children'], {
        fields: 'children',
        using: 'GIN',
        operator: 'array_ops',
        transaction,
      });
      await queryInterface.addIndex('AirtableModelModels', ['number'], {
        fields: 'number',
        using: 'GIN',
        operator: 'array_ops',
        transaction,
      });
      await queryInterface.addIndex('AirtableModelModels', ['parentNumber'], {
        fields: 'parentNumber',
        using: 'GIN',
        operator: 'array_ops',
        transaction,
      });
      await queryInterface.addIndex('AirtableServiceModels', ['model'], {
        fields: 'model',
        using: 'GIN',
        operator: 'array_ops',
        transaction,
      });
      await queryInterface.addIndex('AirtableDrawings', ['modelModel'], {
        fields: 'modelModel',
        using: 'GIN',
        operator: 'array_ops',
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down(queryInterface, Sequelize) {},
};
