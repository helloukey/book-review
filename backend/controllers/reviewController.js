const Review = require("../models/review");

// Add a review
const addReview = async (req, res) => {
  const { book, rating, review } = req.body;
  if (!book || !rating || !review) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const options = req.body;
    options.user = req.user._id;
    const review = await Review.create(options);
    res
      .status(201)
      .json({ success: true, data: review, message: "Review added" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews
const getReviews = async (req, res) => {
  const { book } = req.query;
  try {
    const reviews = await Review.find({ book }).populate("user");
    res
      .status(200)
      .json({ success: true, data: reviews, message: "All reviews" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addReview, getReviews };
