const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Store = require("./Store")

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
            type: DataTypes.STRING,
            allowNull: false,
        },
        grnChequeAmount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grnDueAmount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grnVat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grnDiscount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grnTotal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grnGrandTotal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        products_productId: {
            type: DataTypes.INTEGER,
            references: {
                model: "product",
                key: "productId",
            },
        },
        stock_stockId: {
            type: DataTypes.INTEGER,
            references: {
                model: "stock",
                key: "stockId",
            },
        },
        store_storeId: {
            type: DataTypes.INTEGER,
            references: {
                model: "store",
                key: "storeId",
            },
        },
    },
);

GRN.belongsTo(Product, {
    foreignKey: "products_productId",
    as: "product",
});
GRN.belongsTo(stock, {
    foreignKey: "stock_stockId",
    as: "stock",
});
GRN.belongsTo(Store, {
    foreignKey: "store_storeId",
    as: "store",
});

module.exports = GRN;