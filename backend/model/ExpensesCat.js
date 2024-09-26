const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const Expenses = sequelize.define(
    "Expenses",
    {
        expensesCatId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        expensesCatName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expensesCatType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
);
module.exports = Expenses;