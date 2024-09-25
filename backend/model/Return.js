const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Product = require("./Products");

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

module.exports = Return;
