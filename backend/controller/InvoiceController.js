const Invoice = require("../model/Invoice");
const Product = require("../model/Products");
const Stock = require("../model/Stock"); // Ensure you have this imported

// Create invoice
const createInvoice = async (req, res) => {
    try {
        const {
            invoiceId,
            invoiceDate,
            invoiceAmount,
            discount,
            productId,
            stockId,
        } = req.body;

        // Validate required fields
        if (!invoiceDate || !invoiceAmount || !discount || !productId || !stockId) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if invoice already exists
        if (invoiceId) {
            const existingInvoice = await Invoice.findOne({ where: { invoiceId } });
            if (existingInvoice) {
                return res.status(400).json({ error: "Invoice already exists." });
            }
        }

        // Create a new invoice
        const newInvoice = await Invoice.create({
            invoiceDate,
            invoiceAmount,
            discount,
            products_productId: productId,
            stock_stockId: stockId,
        });

        res.status(201).json(newInvoice);
    } catch (error) {
        // Check for validation errors
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ error: "Validation error: Please check the provided data." });
        }
        // Handle internal server errors
        return res.status(500).json({ error: `An internal error occurred: ${error.message}` });
    }
};

// Get all invoices
const getAllInvoice = async (req, res) => {
    try {
        const invoices = await Invoice.findAll();
        if (invoices.length === 0) {
            return res.status(404).json({ message: "No invoices found" });
        }
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get invoice by id
const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findByPk(id);
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update invoice
const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            invoiceId,
            invoiceDate,
            invoiceAmount,
            discount,
            productId,
            stockId,
        } = req.body;

        if (productId) {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(400).json({ message: "Invalid product ID" });
            }
        }

        if (stockId) {
            const stock = await Stock.findByPk(stockId);
            if (!stock) {
                return res.status(400).json({ message: "Invalid stock ID" });
            }
        }

        const invoice = await Invoice.findByPk(id);
        if (invoice) {
            await invoice.update({
                invoiceDate,
                invoiceAmount,
                discount,
                products_productId: productId,
                stock_stockId: stockId,
            });

            const updatedInvoiceWithProductAndStock = await Invoice.findByPk(id, {
                include: [
                    {
                        model: Product,
                        as: 'product'
                    },
                    {
                        model: Stock,
                        as: 'stock'
                    },
                ],
            });

            res.status(200).json(updatedInvoiceWithProductAndStock);
        } else {
            res.status(404).json({ message: "Invoice not found" });
        }
    } catch (error) {
        res.status(500).json({ message: `An error occurred: ${error.message}` });
    }
};
// Delete a Invoice
const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findByPk(id);
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        await invoice.destroy();
        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createInvoice,
    getAllInvoice,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
};
