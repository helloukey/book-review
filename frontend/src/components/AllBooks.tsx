import { useCallback, useEffect, useState } from "react";
import { getAllBooks } from "../apis/book";
import { Book, User } from "../types/data";
import { Link } from "react-router-dom";
import { AddBookModal } from "./AddBookModal";
import { Loader } from "./Loader";

type Props = {
  user: User | null;
};

const AllBooks = ({ user }: Props) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all books
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    const booksData = await getAllBooks();
    setBooks(booksData?.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Return a loader if book is not fetched yet
  if (!books.length && loading) {
    return <Loader />;
  }

  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      {/* Heading */}
      <h2 className="max-w-2xl mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto text-center">
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
          <span className="relative"></span>
        </span>{" "}
        All Books
      </h2>

      {/* Add Book Modal */}
      <AddBookModal user={user} />

      {/* Books List */}
      <div className="grid gap-8 row-gap-5 lg:grid-cols-3">
        {books && books.length > 0 ? (
          books.map((book: Book) => (
            <Link
              className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl"
              key={book._id}
              to={`/books/${book._id}`}
            >
              <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
              <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
              <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
              <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
              <div className="relative p-5 bg-white rounded-sm">
                <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                  <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-indigo-50 lg:mb-0">
                    <svg
                      className="w-8 h-8 text-deep-purple-accent-400"
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
                  </div>
                  <h6 className="font-semibold leading-5">{book.title}</h6>
                </div>
                <p className="mb-2 text-sm text-gray-900">
                  {book.description && book.description.length > 100
                    ? book.description.slice(0, 100) + "..."
                    : book.description}
                </p>
                <p className="inline-flex items-center text-sm font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800">
                  Read more
                </p>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
            Sorry! No books found.
          </h1>
        )}
      </div>
    </div>
  );
};

export { AllBooks };
