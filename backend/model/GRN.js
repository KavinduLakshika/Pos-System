const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Product = require("./Products");
const Stock = require("./Stock");
const Store = require("./Store");

const GRN = sequelize.define(
    "GRN",
    {
        grnId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        grnDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        grnRef: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grnCashAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grnChequeAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grnDueAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grnVat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        grnTotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        bilImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        products_productId: {
            type: DataTypes.INTEGER,
            references: {
                model: "product",
                key: "productId",
            },
            allowNull: false,
        },
        stock_stockId: {
            type: DataTypes.INTEGER,
            references: {
                model: "stock",
                key: "stockId",
            },
            allowNull: false,
        },
        store_storeId: {
            type: DataTypes.INTEGER,
            references: {
                model: "store",
                key: "storeId",
            },
            allowNull: false,
        },
    },
    {
        tableName: "grn",
        timestamps: false,
    }
);

GRN.belongsTo(Product, {
    foreignKey: "products_productId",
    as: "product",
});
GRN.belongsTo(Stock, {
    foreignKey: "stock_stockId",
    as: "stock",
});
GRN.belongsTo(Store, {
    foreignKey: "store_storeId",
    as: "store",
});

module.exports = GRN;