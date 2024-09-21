const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./dbConfig");

const SupplierController = require("./controller/supplerController");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

//supplier routes
app.post("/supplier", SupplierController.createSupplier);

// Sync the database
sequelize
    .sync()
    .then(() => {
        console.log("Database synchronized");
    })
    .catch((err) => {
        console.error("Error synchronizing database:", err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});