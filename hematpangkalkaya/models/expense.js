'use strict';
module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define('Expense', {
    description: DataTypes.STRING,
    expense: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Expense.belongsTo(models.Category)
      }
    }
  });
  return Expense;
};