const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Product = require("./Products");
const Stock = require("./Stock");

const ProductsHasStock = sequelize.define(
    "ProductsHasStock",
    {
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
    },
    {
        tableName: "products_has_stock",
        timestamps: false,
    }
);

Product.belongsToMany(Stock, {
    through: ProductsHasStock,
    foreignKey: "products_productId",
    as: "stocks",
});

Stock.belongsToMany(Product, {
    through: ProductsHasStock,
    foreignKey: "stock_stockId",
    as: "products",
});

module.exports = ProductsHasStock;
