const Invoice = require("../model/Invoice");
const Customer = require("../model/Customers");
const Stock = require("../model/Stock");

// Create invoice
const createInvoice = async (req, res) => {
    try {
        const {
            invoiceDate,
            invoiceDueDate,
            paidAmount,
            payableAmount,
            dueAmount,
            totalAmount,
            discount,
            invoiceNote,
            stockId,
            cusId,
        } = req.body;

        // Validate required fields
        if (!invoiceDate ||
            !invoiceDueDate ||
            !paidAmount ||
            !payableAmount ||
            !dueAmount ||
            !totalAmount ||
            !discount ||
            !invoiceNote ||
            !stockId ||
            !cusId) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if stock exists
        const stock = await Stock.findByPk(stockId);
        if (!stock) {
            return res.status(400).json({ message: 'Invalid stock ID' });
        }

        // Check if customer exists (fixed issue here)
        const customer = await Customer.findByPk(cusId);
        if (!customer) {
            return res.status(400).json({ message: 'Invalid customer ID' });
        }

        // Create a new invoice
        const newInvoice = await Invoice.create({
            invoiceDate,
            invoiceDueDate,
            paidAmount,
            payableAmount,
            dueAmount,
            totalAmount,
            discount,
            invoiceNote,
            stock_stockId: stockId,
            customer_cusId: cusId,
        });

        // Fetch newly created invoice with stock, and customer information
        const invoiceWithStockAndCustomer = await Invoice.findByPk(newInvoice.invoiceId, {
            include: [
                { model: Stock, as: 'stock' },
                { model: Customer, as: 'customer' },
            ],
        });

        res.status(201).json(invoiceWithStockAndCustomer);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ error: "Validation error: Please check the provided data." });
        }
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
            invoiceDate,
            invoiceDueDate,
            paidAmount,
            payableAmount,
            dueAmount,
            totalAmount,
            discount,
            invoiceNote,
            stockId,
            cusId,
        } = req.body;

        // Check if customer exists (fixed issue here)
        const customer = await Customer.findByPk(cusId);
        if (!customer) {
            return res.status(400).json({ message: 'Invalid customer ID' });
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
                invoiceDueDate,
                paidAmount,
                payableAmount,
                dueAmount,
                totalAmount,
                discount,
                invoiceNote,
                stock_stockId: stockId,
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
    updateInvoice,
    deleteInvoice,
};
