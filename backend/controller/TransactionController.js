const Transaction = require("../model/Transaction");
const Customer = require("../model/Customers");
const Invoice = require("../model/Invoice");

const createTransaction = async (req, res) => {
    try {
        const {
            price,
            dateTime,
            customerId,
            invoiceId,
        } = req.body;

        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(400).json({ message: 'Invalid customer ID' });
        }

        const invoice = await Customer.findByPk(invoiceId);
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
            customer_cusId: customerId,
            invoice_invoiceId: invoiceId,
        });
        const transactionWithCustomerAndInvoice = await Transaction.findByPk(newTransaction.transactionId, {
            include: [
                {
                    model: Customer,
                    as: 'customer',
                },
                {
                    model: Invoice,
                    as: 'invoice',
                },
            ]
        });
        res.status(201).json(transactionWithCustomerAndInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createTransaction,
};
