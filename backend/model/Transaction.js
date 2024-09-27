const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Customer = require("./Customers");
const Invoice = require("./Invoice");

const Transaction = sequelize.define(
    "Transaction",
    {
        transactionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        transactionType: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "Cash",
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        invoice_invoiceId: {
            type: DataTypes.INTEGER,
            references: {
                model: Invoice,
                key: "invoiceId",
            },
            allowNull: false,
        },
    },
    {
        tableName: "transaction",
        timestamps: false,
    }
);
Transaction.belongsTo(Invoice, {
    foreignKey: "invoice_invoiceId",
    as: "invoice",
});

module.exports = Transaction;
