const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Invoice = require("./Invoice");
const Supplier = require("./Supplier");
const RentalInvoice = require("./RentalInvoice");
const User = require("./User");

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
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paid: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        due: {
            type: DataTypes.FLOAT,
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
        supplier_supplierId: {
            type: DataTypes.INTEGER,
            references: {
                model: Supplier,
                key: "supplierId",
            },
            allowNull: false,
        },
        rentalInvoice_rentalInvoiceId: {
            type: DataTypes.INTEGER,
            references: {
                model: RentalInvoice,
                key: "rentalInvoiceId",
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
        tableName: "transaction",
        timestamps: false,
    }
);
Transaction.belongsTo(Invoice, {
    foreignKey: "invoice_invoiceId",
    as: "product",
});
Transaction.belongsTo(Supplier, {
    foreignKey: "supplier_supplierId",
    as: "supplier",
});
Transaction.belongsTo(RentalInvoice, {
    foreignKey: "rentalInvoice_rentalInvoiceId",
    as: "rentalInvoice",
});
Invoice.belongsTo(User, {
    foreignKey: "user_userId",
    as: "user",
});
module.exports = Transaction;
