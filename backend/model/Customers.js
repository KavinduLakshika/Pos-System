const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const Customer = sequelize.define(
    "Customer",
    {
        cusId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cusName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cusAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cusPhone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cusEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cusNIC: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cusPoints: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "customers",
        timestamps: false,
    }
);

module.exports = Customer;
