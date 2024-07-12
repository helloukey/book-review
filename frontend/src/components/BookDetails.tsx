import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../apis/book";
import type { Book, Review, User } from "../types/data";
import { AddReviewModal } from "./AddReviewModal";
import { getReviews } from "../apis/review";
import { Loader } from "./Loader";

type Props = {
  user: User | null;
};

const BookDetails = ({ user }: Props) => {
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { bookId } = useParams();

  // Perform API calls
  const performApiCalls = useCallback(async () => {
    setLoading(true);
    const bookData = await getBook(bookId || "");
    setBook(bookData?.data);
    const reviewsData = await getReviews(bookId || "");
    setReviews(reviewsData?.data);
    setLoading(false);
  }, [bookId]);

  // Fetch book details using bookId
  useEffect(() => {
    performApiCalls();
  }, [performApiCalls]);

  // Return a loader if book is not fetched yet
  if (!book || loading) {
    return <Loader />;
  }

  if (!book || loading) {
    return (
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
        404 Not Found!
      </h1>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-md px-4 md:px-8">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
          {book.title}
        </h1>
        <p className="text-right mb-2">
          <b>Genre:</b> {book.genre}
        </p>
        <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
          {book.description}
        </p>
        <blockquote className="mb-6 border-l-4 pl-4 italic text-gray-500 sm:text-lg md:mb-8 md:pl-6 font-semibold">
          - “{book.author}”
        </blockquote>

        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-md px-4 md:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl xl:mb-12">
              Reviews
            </h2>

            <div className="mb-4 flex items-center justify-end border-t border-b py-4">
              <AddReviewModal user={user} />
            </div>

            <div className="divide-y">
              {reviews && reviews.length > 0 ? (
                reviews.map((review: Review) => (
                  <div
                    className="flex flex-col gap-3 py-4 md:py-8"
                    key={review?._id}
                  >
                    <div>
                      <span className="block text-sm font-bold">
                        {review?.user?.username || "Anonymous"}
                      </span>
                      <span className="block text-sm text-gray-500">
                        {new Date(review?.createdAt || "").toDateString()}
                      </span>
                    </div>

                    <div className="-ml-1 flex gap-0.5">
                      {/* Stars based on the rating */}
                      {Number(review.rating) &&
                        new Array(Number(review.rating)).fill(0).length > 0 &&
                        new Array(Number(review.rating))
                          .fill(0)
                          .map((_, index) => (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              key={index}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                    </div>

                    <p className="text-gray-600">{review?.review}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 my-4">
                  No reviews found!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BookDetails };
