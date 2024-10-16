const Invoice = require("../model/Invoice");
const Customer = require("../model/Customers");
const Product = require("../model/Products");
const Stock = require("../model/Stock");

// Create invoice
const createInvoice = async (req, res) => {
    try {
        const {
            invoiceNo,
            invoiceDate,
            invoiceQty,
            productId,
            cusId,
            stockId,
        } = req.body;

        // Validate required fields
        if (!invoiceDate || !invoiceQty) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        // Check if customer exists
        const customer = await Customer.findByPk(cusId);
        if (!customer) {
            return res.status(400).json({ message: 'Invalid customer ID' });
        }

        // Check if stock exists
        const stock = await Stock.findByPk(stockId);
        if (!stock) {
            return res.status(400).json({ message: 'Invalid stock ID' });
        }

        // Ensure that there is enough quantity in stock
        if (stock.stockQty < invoiceQty) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // Update stock quantity by subtracting the invoice quantity
        const updatedStockQty = stock.stockQty - invoiceQty;
        await stock.update({ stockQty: updatedStockQty });

        // Create a new invoice
        const newInvoice = await Invoice.create({
            invoiceNo,
            invoiceDate,
            invoiceQty,
            products_productId: productId,
            customer_cusId: cusId,
            stock_stockId: stockId,
        });

        // Fetch newly created invoice information
        const invoiceDetails = await Invoice.findByPk(newInvoice.invoiceId, {
            include: [
                { model: Product, as: 'product' },
                { model: Customer, as: 'customer' },
                { model: Stock, as: 'stock' },
            ],
        });

        res.status(201).json(invoiceDetails);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ error: "Validation error: Please check the provided data." });
        }
        return res.status(500).json({ error: `An internal error occurred: ${error.message}` });
    }
};

const getAllInvoice = async (req, res) => {
    try {
        const invoices = await Invoice.findAll({
            include: [
                { model: Product, as: 'product' },
                { model: Customer, as: 'customer' },
                { model: Stock, as: 'stock' },
            ],
        });

        if (invoices.length === 0) {
            return res.status(404).json({ message: "No invoices found" });
        }

        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get invoice by id with customer and product details
const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findByPk(id, {
            include: [
                { model: Product, as: 'product' },
                { model: Customer, as: 'customer' },
                { model: Stock, as: 'stock' },
            ],
        });

        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getInvoiceByNo = async (req, res) => {
    try {
        const { num } = req.params;

        const invoice = await Invoice.findOne({
            where: { invoiceNo: num }
        });

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
            invoiceNo,
            invoiceDate,
            invoiceQty,
            productId,
            cusId,
        } = req.body;

        // Check if customer exists
        const customer = await Customer.findByPk(cusId);
        if (!customer) {
            return res.status(400).json({ message: 'Invalid customer ID' });
        }

        if (productId) {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(400).json({ message: "Invalid product ID" });
            }
        }

        const invoice = await Invoice.findByPk(id);
        if (invoice) {
            await invoice.update({
                invoiceNo,
                invoiceDate,
                invoiceQty,
                products_productId: productId,
                customer_cusId: cusId,
            });
            res.status(200).json(invoice);
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
    getInvoiceByNo,
    updateInvoice,
    deleteInvoice,
};
