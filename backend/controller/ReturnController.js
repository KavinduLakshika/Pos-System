const Return = require("../model/Return");

const createReturn = async (req, res) => {
    try {
        const {
            returnType,
            returnDate,
        } = req.body;
        if (!returnType || !returnDate) {
            return res.status(400).json({ error: "All fields are required." });
        }
        
        const newStock = await Stock.create({
            stockName,
            stockQty,
            stockDate,
            stockStatus: "In stock",
            supplier_supplierId: supplierId,
        });
    } catch (error) {

    }
}