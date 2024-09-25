const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Supplier = require("./Supplier");
const Stock = require("./Stock");

const SupplierHasStock = sequelize.define(
    "SupplierHasStock",
    {
        supplier_supplierId: {
            type: DataTypes.INTEGER,
            references: {
                model: Supplier,
                key: "supplierId",
            },
            allowNull: false,
        },
        stock_stockId: {
            type: DataTypes.INTEGER,
            references: {
                model: Stock,
                key: "stockId",
            },
            allowNull: false,
        },
    },
    {
        tableName: "supplier_has_stock",
        timestamps: false,
    }
);

Supplier.belongsToMany(Stock, {
    through: SupplierHasStock,
    foreignKey: "supplier_supplierId",
    as: "stocks",
});

Stock.belongsToMany(Supplier, {
    through: SupplierHasStock,
    foreignKey: "stock_stockId",
    as: "suppliers",
});

module.exports = SupplierHasStock;
