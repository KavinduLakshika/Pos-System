const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const User = sequelize.define(
    "User",
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userNIC: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userTP: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Active",
        },
    },
    {
        tableName: "user",
        timestamps: false,
    }
);

module.exports = User;
