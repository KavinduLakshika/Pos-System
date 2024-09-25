const Stock = require("../model/Stock");
const Supplier = require("../model/Supplier");

const createStock = async (req, res) => {
    try {
        const {
            stockName,
            stockQty,
            stockDate,
            supplierId,
        } = req.body;


        const supplier = await Supplier.findByPk(supplierId);
        if (!supplier) {
            return res.status(400).json({ message: 'Invalid supplier ID' });
        }


        if (!stockName || !stockQty || !stockDate || !supplierId) {
            return res.status(400).json({ error: "All fields are required." });
        }


        const newStock = await Stock.create({
            stockName,
            stockQty,
            stockDate,
            stockStatus: "In stock",
            supplier_supplierId: supplierId,
        });

        const stockWithSupplier = await Stock.findByPk(newStock.stockId, {
            include: [{
                model: Supplier,
                as: 'supplier'
            }]
        });

        res.status(201).json(stockWithSupplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// Get all stock
const getAllStocks = async (req, res) => {
    try {
        const stock = await Stock.findAll({
            include: [{
                model: Supplier,
                as: 'supplier'
            }]
        });
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a stock by ID
const getStockById = async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await Stock.findByPk(id, {
            include: [{
                model: Supplier,
                as: 'supplier'
            }]
        });

        if (stock) {
            res.status(200).json(stock);
        } else {
            res.status(404).json({ message: 'Stock not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a stock
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            stockName,
            stockQty,
            stockDate,
            supplierId,
        } = req.body;

        const stock = await Stock.findByPk(id);
        if (!stock) {
            return res.status(404).json({ message: "Stock not found" });
        }

        await stock.update({
            stockName,
            stockQty,
            stockDate,
            stockStatus: "In stock",
            supplier_supplierId: supplierId,
        });

        res.status(200).json(stock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a category
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
    updateCategory,
    deleteStock,
}