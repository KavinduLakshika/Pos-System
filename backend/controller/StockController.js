const Stock = require("../model/Stock");
const Supplier = require("../model/Supplier");
const Product = require("../model/Products");
const Store = require("../model/Store");

const createStock = async (req, res) => {
    try {
        const {
            stockName,
            stockQty,
            stockDate,
            stockPrice,
            stockDescription,
            productId,
            supplierId,
            storeId,
        } = req.body;

        // Check if all required fields are present
        if (!stockName || !stockQty || !stockDate || !stockPrice || !productId || !supplierId || !storeId) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if supplier exists
        const supplier = await Supplier.findByPk(supplierId);
        if (!supplier) {
            return res.status(400).json({ message: 'Invalid supplier ID' });
        }

        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        // Check if store exists
        const store = await Store.findByPk(storeId);
        if (!store) {
            return res.status(400).json({ message: 'Invalid store ID' });
        }

        // Check if stock 
        const existingStock = await Stock.findOne({ where: { stockName } });
        if (existingStock) {
            return res.status(400).json({ error: "A Stock with this Name already exists." });
        }

        // Create new stock
        const newStock = await Stock.create({
            stockName,
            stockQty,
            stockDate,
            stockPrice,
            stockDescription,
            stockStatus: "In stock",
            products_productId: productId,
            supplier_supplierId: supplierId,
            store_storeId: storeId,
        });

        // Fetch newly created stock with supplier, product, and store information
        const stockWithSupplierAndProduct = await Stock.findByPk(newStock.stockId, {
            include: [
                { model: Supplier, as: 'supplier' },
                { model: Product, as: 'product' },
                { model: Store, as: 'store' },
            ],
        });

        res.status(201).json(stockWithSupplierAndProduct);
    } catch (error) {
        return res.status(500).json({ message: `An internal error occurred: ${error.message}` });
    }
};

// Get all stocks
const getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.findAll({
            include: [
                {
                    model: Supplier,
                    as: 'supplier'
                }
            ]
        });
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a stock by ID
const getStockById = async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await Stock.findByPk(id, {
            include: [
                {
                    model: Supplier,
                    as: 'supplier'
                }
            ]
        });

        if (!stock) {
            return res.status(404).json({ message: "Stock not found" });
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update a Stock
const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            stockName,
            stockQty,
            stockDate,
            stockPrice,
            stockDescription,
            stockStatus,
            productId,
            supplierId,
            storeId,
        } = req.body;

        const stock = await Stock.findByPk(id);
        if (!stock) {
            return res.status(404).json({ message: "Stock not found" });
        }

        await stock.update({
            stockName,
            stockQty,
            stockDate,
            stockPrice,
            stockDescription,
            stockStatus,
            products_productId: productId,
            supplier_supplierId: supplierId,
            store_storeId: storeId,
        });

        res.status(200).json(stock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a stock
const deleteStock = async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await Stock.findByPk(id);
        if (!stock) {
            return res.status(404).json({ message: "Stock not found" });
        }
        await stock.destroy();
        res.status(200).json({ message: "Stock deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createStock,
    getAllStocks,
    getStockById,
    updateStock,
    deleteStock,
}