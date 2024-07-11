import { useState } from "react";
import type { User } from "../types/data";
import { useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { addReview } from "../apis/review";

type Props = {
  user: User | null;
};

const AddReviewModal = ({ user }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { bookId } = useParams();

  // Handle add review
  const handleAddReview = async () => {
    setError("");

    // Validate review
    if (!review) {
      setError("Review cannot be empty");
      return;
    }
    if (review.length < 50 || review.length > 300) {
      setError("Review must be between 50 and 300 characters");
      return;
    }
    if (rating === 0) {
      setError("Rating cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const data = await addReview({
        book: bookId || "",
        rating: String(rating),
        review,
      });
      setLoading(false);
      if (!data?.success) {
        setError(data?.message || "Error adding review");
        return;
      }
      if (data?.success) {
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      setError("Error adding review");
    }
  };

  return (
    <>
      <div className="flex items-center justify-end">
        <button
          className="bg-gray-600 active:bg-gray-800 hover:bg-gray-800 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Review
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">Add a Review</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
                    <div className="w-full">
                      <label
                        htmlFor="bookId"
                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                      >
                        Book Id
                      </label>
                      <input
                        name="bookId"
                        value={bookId}
                        disabled
                        className="w-full rounded border bg-gray-200 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="user"
                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                      >
                        User
                      </label>
                      <input
                        name="user"
                        value={user?._id}
                        disabled
                        className="w-full rounded border bg-gray-200 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="review"
                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                      >
                        Review:{" "}
                        <span className="text-xs font-bold">
                          {review.length}/300{" "}
                        </span>
                      </label>
                      <textarea
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="h-36 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      ></textarea>
                    </div>
                    <div className="sm:col-span-2 mx-auto">
                      <Rating
                        style={{ maxWidth: 180 }}
                        value={rating}
                        onChange={setRating}
                      />
                    </div>
                  </div>
                  {/* Error */}
                  {error ? (
                    <p className="text-md text-red-500 my-2 text-center">{error}</p>
                  ) : null}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled={loading}
                    onClick={handleAddReview}
                  >
                    {loading ? "Adding..." : "Add Review"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export { AddReviewModal };
