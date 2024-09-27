const Product = require("../model/Products");
const Category = require("../model/Category");
const multer = require('multer');
const path = require('path');
const fs = require('fs');


//Image function
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `${timestamp}${ext}`);
    }
});

const upload = multer({ storage: storage }).single('productImage');

// Create product
const createProduct = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: 'Image upload failed' });
        }

        try {
            const {
                productName,
                productCode,
                productWeight,
                productBuyingPrice,
                productSellingPrice,
                productWarranty,
                productQty,
                productDescription,
                categoryId
            } = req.body;

            const category = await Category.findByPk(categoryId);

            if (!category) {
                return res.status(400).json({ message: 'Invalid category ID' });
            }

            if (!productName ||
                !productCode ||
                !productWeight ||
                !productBuyingPrice ||
                !productSellingPrice ||
                !productWarranty ||
                !productQty ||
                !productDescription ||
                !categoryId) {
                return res.status(400).json({ error: "All fields are required." });
            }

            let productImage = null;
            if (req.file) {
                productImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            }

            const newProduct = await Product.create({
                productName,
                productCode,
                productWeight,
                productBuyingPrice,
                productSellingPrice,
                productWarranty,
                productQty,
                productDescription,
                productImage,
                productStatus: "In stock",
                category_categoryId: categoryId
            });

            const productWithCategory = await Product.findByPk(newProduct.productId, {
                include: [{
                    model: Category,
                    as: 'category'
                }]
            });

            res.status(201).json(productWithCategory);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({ error: "Validation error: Please check the provided data." });
            }

            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    error: "Duplicate field value: A product name already exists."
                });
            }

            res.status(400).json({ error: `An error occurred: ${error.message}` });
        }
    });
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{
                model: Category,
                as: 'category'
            }]
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: [{
                model: Category,
                as: 'category'
            }]
        });

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: 'Image upload failed' });
        }

        try {
            const { id } = req.params;
            const {
                productName,
                productCode,
                productWeight,
                productBuyingPrice,
                productSellingPrice,
                productWarranty,
                productQty,
                productStatus,
                categoryId
            } = req.body;

            if (categoryId) {
                const category = await Category.findByPk(categoryId);
                if (!category) {
                    return res.status(400).json({ message: 'Invalid category ID' });
                }
            }

            const product = await Product.findByPk(id);

            if (product) {
                let productImage = product.productImage;
                if (req.file) {
                    productImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
                }

                await product.update({
                    productName,
                    productCode,
                    productWeight,
                    productBuyingPrice,
                    productSellingPrice,
                    productWarranty,
                    productQty,
                    productStatus,
                    category_categoryId: categoryId,
                    productImage
                });

                const updatedProductWithCategory = await Product.findByPk(id, {
                    include: [{
                        model: Category,
                        as: 'category'
                    }]
                });

                res.status(200).json(updatedProductWithCategory);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const productImagePath = product.productImage
            ? path.join(__dirname, '..', 'uploads', path.basename(product.productImage))
            : null;

        await product.destroy();

        if (productImagePath && fs.existsSync(productImagePath)) {
            fs.unlink(productImagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image file: ${err.message}`);
                }
            });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
