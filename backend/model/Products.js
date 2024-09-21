const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Category = require("./Category");

const Product = sequelize.define(
  "Product",
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productCategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productWeight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productBuyingPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productSellingPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

module.exports = Product;
