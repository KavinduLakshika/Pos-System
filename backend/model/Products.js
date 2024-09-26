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
    productCode: {
      type: DataTypes.STRING,
      allowNull: false,
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
    productWarranty: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    productQty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    productStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "In stock",
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
    tableName: "products",
    timestamps: false,
  }
);

Product.belongsTo(Category, {
  foreignKey: "category_categoryId",
  as: "category",
});

module.exports = Product;
