const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Supplier = require("./Supplier");

const Stock = sequelize.define(
    "Stock",
    {
        stockId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        stockName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stockQty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stockDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        stockStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "In Stock",
        },
        supplier_supplierId: {
            type: DataTypes.INTEGER,
            references: {
                model: Supplier,
                key: "supplierId",
            },
        },
    },
    {
        tableName: "stock",
        timestamps: false,
    }
);

Stock.belongsTo(Supplier, {
    foreignKey: "supplier_supplierId",
    as: "supplier",
});

module.exports = Stock;
