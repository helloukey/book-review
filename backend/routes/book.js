const bookRoute = require("express").Router();
const requireAuth = require("../middleware/authMiddleware");
const { addBook, getBooks, getUserBooks, deleteBook } = require("../controllers/bookController");

bookRoute.post("/add", requireAuth, addBook);
bookRoute.get("/all", requireAuth, getBooks);
bookRoute.get("/user", requireAuth, getUserBooks);
bookRoute.delete("/delete/:id", requireAuth, deleteBook);