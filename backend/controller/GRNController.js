const GRN = require("../model/GRN");
const Product = require("../model/Products");
const Stock = require("../model/Stock");
const Store = require("../model/Store");

//create grn
const createGRN = async (req, res) => {
    try {
        const {
            grnDate,
            grnRef,
            grnCashAmount,
            grnChequeAmount,
            grnChequeNumber,
            grnDueAmount,
            grnVat,
            grnDiscount,
            grnTotal,
            grnGrandTotal,
            productId,
            stockId,
            storeId,
        } = req.body;

        if (
            !grnDate ||
            !grnRef ||
            !grnCashAmount ||
            !grnChequeNumber ||
            !grnDueAmount ||
            !grnVat ||
            !grnDiscount ||
            !grnTotal ||
            !grnGrandTotal ||
            !productId ||
            !stockId ||
            !storeId
        ) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Validate product
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        // Validate stock
        const stock = await Stock.findByPk(stockId);
        if (!stock) {
            return res.status(400).json({ message: 'Invalid stock ID' });
        }

        // Validate store
        const store = await Store.findByPk(storeId);
        if (!store) {
            return res.status(400).json({ message: 'Invalid store ID' });
        }

        // Check for existing grnRef
        const existingGRN = await GRN.findOne({ where: { grnRef } });
        if (existingGRN) {
            return res.status(409).json({ error: "GRN Ref Number already exists." });
        }

        const newGRN = await GRN.create({
            grnDate,
            grnRef,
            grnCashAmount,
            grnChequeAmount,
            grnChequeNumber,
            grnDueAmount,
            grnVat,
            grnDiscount,
            grnTotal,
            grnGrandTotal,
            products_productId: productId,
            stock_stockId: stockId,
            store_storeId: storeId,
        });
        const grnWithDetails = await GRN.findByPk(newGRN.grnId, {
            include: [
                { model: Product, as: 'product' },
                { model: Stock, as: 'stock' },
                { model: Store, as: 'store' },
            ],
        });

        res.status(201).json(grnWithDetails);

    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ error: "Validation error: Please check the provided data." });
        }
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ error: "GRN already exists." });
        }
        return res.status(500).json({ error: `An internal server error occurred: ${error.message}` });
    }
};

// Get all GRN
const getAllGrn = async (req, res) => {
    try {
        const grn = await GRN.findAll();
        res.status(200).json(grn);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};

// Get grn by ID
const getGrnById = async (req, res) => {
    try {
        const { id } = req.params;
        const grn = await GRN.findByPk(id);

        if (!grn) {
            return res.status(404).json({ message: 'GRN not found' });
        }
        res.status(200).json(grn);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};

module.exports = {
    createGRN,
    getAllGrn,
    getGrnById,
}