const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Product = require("./Products");
const Customer = require("./Customers");
const User = require("./User");

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
        invoiceQty: {
            type: DataTypes.INTEGER,
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
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        totalAmount: {
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
                key: "productId",
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
        user_userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "userId",
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
Invoice.belongsTo(User, {
    foreignKey: "user_userId",
    as: "user",
});
module.exports = Invoice;
