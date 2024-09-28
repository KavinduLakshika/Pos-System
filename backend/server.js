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
const StockController = require("./controller/StockController");
const InvoiceController = require("./controller/InvoiceController");
const TransactionController = require("./controller/TransactionController");
const StoreController = require("./controller/StoreController");
const ReturnController = require("./controller/ReturnController");
const ExpenseController = require("./controller/ExpensesController");
const ExpensesCatController = require("./controller/ExpensesCatController");

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

//stock routes
app.post("/stock", StockController.createStock);
app.get("/stocks", StockController.getAllStocks);
app.get("/stock/:id", StockController.getStockById);
app.put("/stock/:id", StockController.updateStock);
app.delete("/stock/:id", StockController.deleteStock);

//invoice routes
app.post("/invoice", InvoiceController.createInvoice);
app.get("/invoice", InvoiceController.getAllInvoice);
app.get("/invoice/:id", InvoiceController.getInvoiceById);
app.put("/invoice/:id", InvoiceController.updateInvoice);
app.delete("/invoice/:id", InvoiceController.deleteInvoice);

//transaction routes
app.post("/transaction", TransactionController.createTransaction);
app.get("/transactions", TransactionController.getAllTransactions);
app.get("/transaction/:id", TransactionController.getTransactionById);

//store routes
app.post("/store", StoreController.createStore);
app.get("/stores", StoreController.getAllStores);
app.get("/store/:id", StoreController.getStoreById);
app.put("/store/:id", StoreController.updateStore);
app.delete("/store/:id", StoreController.deleteStore);

//return routes
app.post("/return", ReturnController.createReturn);
app.get("/returns", ReturnController.getAllReturns);
app.get("/return/:id", ReturnController.getReturnById);

//expenses routes
app.post("/expense", ExpenseController.createExpense);
app.get("/expenses", ExpenseController.getAllExpenses);
app.get("/expense/:id", ExpenseController.getExpenseById);
app.put("/expense/:id", ExpenseController.updateExpense);
app.delete("/expense/:id", ExpenseController.deleteExpense);

//expenses category routes
app.post("/expensesCat", ExpensesCatController.createExpensesCategory);
app.get("/expensesCats", ExpensesCatController.getAllExpensesCats);
app.get("/expensesCat/:id", ExpensesCatController.getExpensesCatById);
app.put("/expensesCat/:id", ExpensesCatController.updateExpensesCat);
app.delete("/expensesCat/:id", ExpensesCatController.deleteExpensesCat);

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