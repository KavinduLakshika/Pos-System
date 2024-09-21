const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const Return = sequelize.define(
    "Return",
    {
        returnId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        returnType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "return",
        timestamps: false,
    }
);

module.exports = Return;
