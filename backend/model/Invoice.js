const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Product = require("./Product");
const Return = require("./Return");

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
        paidAmount: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        dueAmount: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        products_productId: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: "productId",
            },
            allowNull: false,
        },
        products_return_returnId: {
            type: DataTypes.INTEGER,
            references: {
                model: Return,
                key: "returnId",
            },
            allowNull: true,
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
Invoice.belongsTo(Return, {
    foreignKey: "products_return_returnId",
    as: "return",
});

module.exports = Invoice;
