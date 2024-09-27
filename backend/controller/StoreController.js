const Store = require("../model/Store");

const createStore = async (req, res) => {
    try {
        const { storeName, storeAddress } = req.body;
        if (!storeName || !storeAddress) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingStore = await Store.findOne({ where: { storeAddress } });
        if (existingStore) {
            return res.status(400).json({ error: "Store Address already exists." });
        }

        const newStore = await Store.create({
            storeName,
            storeAddress,
            storeStatus: "Active",
        });

        res.status(201).json({ newStore });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ error: "Validation error: Please check the provided data." });
        }
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ error: "Store already exists." });
        }
        res.status(400).json({ error: `An error occurred: ${error.message}` });
    }
};

module.exports = {
    createStore,
};
