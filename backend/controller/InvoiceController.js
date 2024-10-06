const Invoice = require("../model/Invoice");
const Customer = require("../model/Customers");
const Product = require("../model/Products");
const Transaction = require("../model/Transaction");
const User = require("../model/User");

// Create invoice
const createInvoice = async (req, res) => {
    try {
        const {
            invoiceDate,
            invoiceQty,
            paidAmount,
            payableAmount,
            dueAmount,
            discount,
            totalAmount,
            invoiceNote,
            productId,
            cusId,
            userId,
        } = req.body;

        // Validate required fields
        if (!invoiceDate ||
            !invoiceQty ||
            !paidAmount ||
            !totalAmount ||
            !invoiceNote) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        // Check if customer exists (fixed issue here)
        const customer = await Customer.findByPk(cusId);
        if (!customer) {
            return res.status(400).json({ message: 'Invalid customer ID' });
        }

        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Create a new invoice
        const newInvoice = await Invoice.create({
            invoiceDate,
            invoiceQty,
            paidAmount,
            payableAmount,
            dueAmount,
            totalAmount,
            discount,
            invoiceNote,
            products_productId: productId,
            customer_cusId: cusId,
            user_userId: userId,
        });

        // Fetch newly created invoice  information
        const invoiceDetails = await Invoice.findByPk(newInvoice.invoiceId, {
            include: [
                { model: Product, as: 'product' },
                { model: Customer, as: 'customer' },
                { model: User, as: 'user' },
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
                { model: User, as: 'user' },
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
                { model: User, as: 'user' },
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

// Update invoice
const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            invoiceDate,
            invoiceQty,
            paidAmount,
            payableAmount,
            dueAmount,
            totalAmount,
            discount,
            invoiceNote,
            productId,
            cusId,
            userId,
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
        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const invoice = await Invoice.findByPk(id);
        if (invoice) {
            await invoice.update({
                invoiceDate,
                invoiceDueDate,
                invoiceQty,
                paidAmount,
                payableAmount,
                dueAmount,
                totalAmount,
                discount,
                invoiceNote,
                products_productId: productId,
                customer_cusId: cusId,
                user_userId: userId,
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
