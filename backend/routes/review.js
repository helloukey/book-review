const reviewRoute = require("express").Router();
const { requireAuth } = require("../middleware/authMiddleware");
const { addReview, getReviews } = require("../controllers/reviewController");

reviewRoute.post("/add-review", requireAuth, addReview);
reviewRoute.get("/:bookId", requireAuth, getReviews);

module.exports = reviewRoute;
