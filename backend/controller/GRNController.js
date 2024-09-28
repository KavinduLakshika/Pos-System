const GRN = require("../model/GRN");
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
            !grnChequeAmount ||
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
        const product = await product.findByPk(productId);
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
    } catch (error) {

    }
}