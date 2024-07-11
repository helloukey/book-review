import type { Review } from "../types/data";

// Add review
const addReview = async (review: Review) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/review/add-review",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(review),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding review: ", error);
  }
};

// Get reviews by bookId
const getReviews = async (bookId: string) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/review/${bookId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting reviews: ", error);
  }
};

export { addReview, getReviews };
