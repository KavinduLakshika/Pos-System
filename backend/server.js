const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./dbConfig");

//Controllers
const SupplierController = require("./controller/SupplerController");
const UserController = require("./controller/UserController");
const CustomerController = require("./controller/CustomerController");
const CategoryController = require("./controller/CategoryController");
const ProductController = require("./controller/ProductController");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

//user routes
app.post("/user", UserController.createUser);
app.get("/users", UserController.getAllUsers);
app.get("/user/:id", UserController.getUserById);
app.put("/user/:id", UserController.updateUser);
app.delete("/user/:id", UserController.deleteUser);
app.post("/userLogin", UserController.userLogin);

//customer routes
app.post("/customer", CustomerController.createCustomer);
app.get("/customers", CustomerController.getAllCustomers);
app.get("/customer/:id", CustomerController.getCustomerById);
app.put("/customer/:id", CustomerController.updateCustomer);
app.delete("/customer/:id", CustomerController.deleteCustomer);

//supplier routes
app.post("/supplier", SupplierController.createSupplier);
app.get("/suppliers", SupplierController.getAllSuppliers);
app.get("/supplier/:id", SupplierController.getSupplierById);
app.put("/supplier/:id", SupplierController.updateSupplier);
app.delete("/supplier/:id", SupplierController.deleteSupplier);

//category routes
app.post("/category", CategoryController.createCategory);
app.get("/categories", CategoryController.getAllCategories);
app.get("/category/:id", CategoryController.getCategoryById);
app.put("/category/:id", CategoryController.updateCategory);
app.delete("/category/:id", CategoryController.deleteCustomer);

//product routes
app.post("/product", ProductController.createProduct);
app.get("/products", ProductController.getAllProducts);
app.get("/product/:id", ProductController.getProductById);
app.put("/product/:id", ProductController.updateProduct);
app.delete("/product/:id", ProductController.deleteProduct);


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