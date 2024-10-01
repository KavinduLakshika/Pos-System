const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Customer = require("./Customers");
const Invoice = require("./Invoice");

const Transaction = sequelize.define(
    "Transaction",
    {
        transactionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        transactionType: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "Cash",
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "transaction",
        timestamps: false,
    }
);
module.exports = Transaction;
