import { useState } from "react";
import { User } from "../types/data";
import { addBook, getAllBooks } from "../apis/book";

type Props = {
  user: User | null;
};

const AddBookModal = ({ user }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle add book
  const handleAddBook = async () => {
    setError("");

    // Perform validation
    if (!title || !author || !genre || !description) {
      setError("All fields are required");
      return;
    }
    if (description.length < 100 || description.length > 500) {
      setError("Description must be between 100 and 500 characters");
      return;
    }

    try {
      setLoading(true);
      const data = await addBook({
        title,
        author,
        genre,
        description,
        submittedBy: user?._id || "",
      });
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
      setError("Something went wrong. Please try again later.");
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
          Add Book
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
                  <h3 className="text-xl font-semibold">Add a Book</h3>
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
                        htmlFor="title"
                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                      >
                        Title
                      </label>
                      <input
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="author"
                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                      >
                        Author
                      </label>
                      <input
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="genre"
                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                      >
                        Genre
                      </label>
                      <input
                        name="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="submittedBy"
                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                      >
                        submittedBy
                      </label>
                      <input
                        name="submittedBy"
                        disabled
                        value={user?._id}
                        className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="description"
                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                      >
                        Description:{" "}
                        <span className="text-xs font-bold">
                          {description.length}/500{" "}
                        </span>
                      </label>
                      <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="h-36 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      ></textarea>
                    </div>
                  </div>
                  {/* Error */}
                  {error ? (
                    <p className="text-md text-red-500 my-2">{error}</p>
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
                    onClick={handleAddBook}
                  >
                    {loading ? "Adding..." : "Add Book"}
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

export { AddBookModal };
