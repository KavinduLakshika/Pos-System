const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig"); 
const Customer = require("./Customer");
const Product = require("./Product");

const Transaction = sequelize.define(
    "Transaction",
    {
        transactionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        transactionQty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        dateTime: {
            type: DataTypes.DATE,
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
        products_productId: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: "productId",
            },
            allowNull: false,
        },
    },
    {
        tableName: "transaction",
        timestamps: false,
    }
);

Transaction.belongsTo(Customer, {
    foreignKey: "customer_cusId",
    as: "customer",
});
Transaction.belongsTo(Product, {
    foreignKey: "products_productId",
    as: "product",
});

module.exports = Transaction;
