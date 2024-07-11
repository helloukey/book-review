import { useEffect, useState } from "react";
import { deleteBook, getUserBooks } from "../apis/book";
import { Book } from "../types/data";

type Props = {};

const SubmittedBooks = (props: Props) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch submitted books
  useEffect(() => {
    getUserBooks().then((data) => setBooks(data?.data));
  }, []);

  // Handle delete book
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const data = await deleteBook(id);
      setLoading(false);
      if (!data?.success) {
        setError(data?.message);
        return;
      }
      if (data?.success) {
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
      return;
    }
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-2xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-2xl mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="9012817d-af60-45bb-9786-89646bc1c945"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#9012817d-af60-45bb-9786-89646bc1c945)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">Your</span>
          </span>{" "}
          Submitted Books
        </h2>
      </div>

      {/* Error */}
      {error ? (
        <p className="text-md text-red-500 text-center mb-4">{error}</p>
      ) : null}

      {/* No books available */}
      {books && books.length === 0 ? (
        <p className="text-center">Sorry, no book available</p>
      ) : null}

      {books && books.length > 0
        ? books.map((book: Book) => (
            <div
              className="max-w-xl space-y-3 sm:mx-auto lg:max-w-2xl"
              key={book._id}
            >
              <div className="flex items-center justify-between p-2 transition-colors duration-200 border rounded shadow group hover:bg-deep-purple-accent-400 hover:border-deep-purple-accent-400">
                <div className="flex items-center gap-2 mr-2">
                  <svg
                    className="w-6 h-6 transition-colors duration-200 text-deep-purple-accent-400 group-hover:text-gray-600 sm:w-8 sm:h-8"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                  <span className="text-gray-800 transition-colors duration-200 group-hover:text-gray-600 truncate">
                    {loading ? "loading..." : book.title}
                  </span>
                </div>
                {/* Delete button */}
                <button
                  className="btn p-2"
                  onClick={() => handleDelete(book?._id || "")}
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export { SubmittedBooks };
