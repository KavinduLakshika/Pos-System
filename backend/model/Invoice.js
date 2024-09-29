const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Product = require("./Products");
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
        invoiceDueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        paidAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        payableAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        dueAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        invoiceNote: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        products_productId: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: "product",
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
Invoice.belongsTo(Customer, {
    foreignKey: "customer_cusId",
    as: "customer",
});

module.exports = Invoice;
