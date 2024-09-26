const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Customer = require("./Customers");
const Category = require("./Category");

const RentalInvoice = sequelize.define(
    "RentalInvoice",
    {
        rentalInvoiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rentalInvoiceDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rentalInvoiceTotalAmount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rentalInvoiceAdvancePayment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rentalInvoiceNote: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_cusId: {
            type: DataTypes.INTEGER,
            references: {
                model: "customer",
                key: "cusId",
            },
        },
        products_productId: {
            type: DataTypes.INTEGER,
            references: {
                model: "product",
                key: "productId",
            },
        },
        category_categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: "category",
                key: "categoryId",
            },
        },
    },
    {
        tableName: "rentalInvoice",
        timestamps: false,
    }
);

RentalInvoice.belongsTo(Customer, {
    foreignKey: "customer_cusId",
    as: "customer",
});
RentalInvoice.belongsTo(Product, {
    foreignKey: "products_productId",
    as: "product",
});
RentalInvoice.belongsTo(Category, {
    foreignKey: "category_categoryId",
    as: "category",
});

module.exports = RentalInvoice;