const Book = require("../models/Book");

// Add a book
const addBook = async (req, res) => {
  const { title, author, genre, description } = req.body;
  if (!title || !author || !genre || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const options = req.body;
    options.submittedBy = req.user._id;
    const book = await Book.create(options);
    res.status(201).json({ success: true, data: book, message: "Book added" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).populate("submittedBy");
    res.status(200).json({ success: true, data: books, message: "All books" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user books
const getUserBooks = async (req, res) => {
  try {
    const books = await Book.find({ submittedBy: req.user._id });
    res.status(200).json({ success: true, data: books, message: "User books" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    if (book.submittedBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized to delete book" });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single book
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({ success: true, data: book, message: "Book found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addBook, getBooks, getUserBooks, deleteBook, getBook };
