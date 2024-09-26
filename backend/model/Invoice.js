const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Product = require("./Products");
const Stock = require("./Stock");
const Customer = require("./Customers");

const Invoice = sequelize.define(
    "Invoice",
    {
        invoiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        invoiceDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        invoiceAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        products_productId: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: "productId",
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
        customer_cusId: {
            type: DataTypes.INTEGER,
            references: {
                model: Customer,
                key: "cusId",
            },
            allowNull: false,
        },
    },
    {
        tableName: "invoice",
        timestamps: false,
    }
);

Invoice.belongsTo(Product, {
    foreignKey: "products_productId",
    as: "product",
});
Invoice.belongsTo(Stock, {
    foreignKey: "stock_stockId",
    as: "stock",
});
Invoice.belongsTo(Customer, {
    foreignKey: "customer_cusId",
    as: "customer",
});

module.exports = Invoice;
