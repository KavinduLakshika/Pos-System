const Transaction = require("../model/Transaction");
const Customer = require("../model/Customers");
const Invoice = require("../model/Invoice");
const Supplier = require("../model/Supplier");
const RentalInvoice = require("../model/RentalInvoice");


const createTransaction = async (req, res) => {
    try {
        const {
            transactionType,
            price,
            dateTime,
            invoiceId,
            supplierId,
            rentalInvoiceId,
        } = req.body;

        if (!transactionType || !price || !dateTime) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Validate invoice
        const invoice = await Invoice.findByPk(invoiceId);
        if (!invoice) {
            return res.status(400).json({ message: 'Invalid invoice ID' });
        }

        // Validate supplier
        const supplier = await Supplier.findByPk(supplierId);
        if (!supplier) {
            return res.status(400).json({ message: 'Invalid supplier ID' });
        }

        // Validate rentalInvoice
        const rentalInvoice = await RentalInvoice.findByPk(rentalInvoiceId);
        if (!rentalInvoice) {
            return res.status(400).json({ message: 'Invalid rentalInvoice ID' });
        }

        const newTransaction = await Transaction.create({
            transactionType: "cash",
            price,
            dateTime,
            invoice_invoiceId: invoiceId,
            supplier_supplierId: supplierId,
            rentalInvoice_rentalInvoiceId: rentalInvoiceId,
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const transaction = await Transaction.findAll();
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByPk(id)
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById,
};
