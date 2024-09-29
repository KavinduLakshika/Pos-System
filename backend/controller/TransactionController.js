const Transaction = require("../model/Transaction");
const Customer = require("../model/Customers");
const Invoice = require("../model/Invoice");

const createTransaction = async (req, res) => {
    try {
        const {
            price,
            dateTime,
            invoiceId,
        } = req.body;

        const invoice = await Invoice.findByPk(invoiceId);
        if (!invoice) {
            return res.status(400).json({ message: 'Invalid invoice ID' });
        }

        if (!price || !dateTime) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newTransaction = await Transaction.create({
            transactionType: "cash",
            price,
            dateTime,
            invoice_invoiceId: invoiceId,
        });

        const transactionWithInvoice = await Transaction.findByPk(newTransaction.transactionId, {
            include: [
                {
                    model: Invoice,
                    as: 'invoice',
                },
            ],
        });

        res.status(201).json(transactionWithInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const transaction = await Transaction.findAll({
            include: [
                {
                    model: Invoice,
                    as: 'invoice',
                },
            ],
        });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByPk(id, {
            include: [
                {
                    model: Invoice,
                    as: 'invoice',
                },
            ],
        });
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
