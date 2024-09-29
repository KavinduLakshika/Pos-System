const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Supplier = require("./Supplier");
const Product = require("./Products");
const Store = require("./Store");

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
        stockPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stockDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stockStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "In Stock",
        },
        products_productId: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: "productId",
            },
        },
        supplier_supplierId: {
            type: DataTypes.INTEGER,
            references: {
                model: Supplier,
                key: "supplierId",
            },
        },
        store_storeId: {
            type: DataTypes.INTEGER,
            references: {
                model: Store,
                key: "storeId",
            },
        },
    },
    {
        tableName: "stock",
        timestamps: false,
    }
);
Stock.belongsTo(Product, {
    foreignKey: "products_productId",
    as: "product",
});
Stock.belongsTo(Supplier, {
    foreignKey: "supplier_supplierId",
    as: "supplier",
});
Stock.belongsTo(Store, {
    foreignKey: 'store_storeId',
    as: 'store'
});

module.exports = Stock;
