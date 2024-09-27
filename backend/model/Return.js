const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Product = require("./Products");
const Category = require("./Category");
const Invoice = require("./Invoice");
const Customer = require("./Customers");

const Return = sequelize.define(
    "Return",
    {
        returnId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        returnType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        returnDate: {
            type: DataTypes.DATE,
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
        store_storeId: {
            type: DataTypes.INTEGER,
            references: {
                model: Store,
                key: "storeId",
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
        tableName: "return",
        timestamps: false,
    }
);
Return.belongsTo(Product, {
    foreignKey: "products_productId",
    as: "products",
});
Return.belongsTo(Store, {
    foreignKey: "store_storeId",
    as: "store",
});
Return.belongsTo(User, {
    foreignKey: "user_userId",
    as: "user",
});
Return.belongsTo(Invoice, {
    foreignKey: "invoice_invoiceId",
    as: "invoice",
});
module.exports = Return;
