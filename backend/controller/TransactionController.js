const Transaction = require("../model/Transaction");
const Customer = require("../model/Customers");
const Invoice = require("../model/Invoice");

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

        const newTransaction = await Transaction.create({
            transactionType: "cash",
            price,
            dateTime,
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
