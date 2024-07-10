import { Link } from "react-router-dom";
import type { user } from "../types/data";
import { logoutUser } from "../apis/user";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  user: user | null;
};

const Layout = ({ children, user }: Props) => {
  const [loading, setLoading] = useState(false);

  // Handle Logout
  const handleLogout = async () => {
    try {
      setLoading(true);
      const data = await logoutUser();
      setLoading(false);
      if (data?.success) {
        window.location.href = "/";
      }
    } catch (error) {
      setLoading(false);
      console.error("Error logging out", error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <header className="mb-8 flex items-center justify-between border-b py-4 md:mb-12 xl:mb-16 px-4 md:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
          aria-label="logo"
        >
          <svg
            width="95"
            height="94"
            viewBox="0 0 95 94"
            className="h-auto w-6 text-indigo-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M96 0V47L48 94H0V47L48 0H96Z" />
          </svg>
          Book-Review
        </Link>
        <nav className="hidden gap-12 lg:flex items-center">
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-lg font-semibold text-indigo-500 p-4"
              >
                Profile
              </Link>
              <Link
                to="/books"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700 p-4"
              >
                Books
              </Link>
              <button
                className="inline-block rounded-lg bg-gray-700 p-4 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-gray-800 focus-visible:ring active:text-gray-700 md:text-base"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : null}
        </nav>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </header>
      {/* Children */}
      {children}
      {/* Footer */}
      <div className="bg-white pt-4 sm:pt-10 lg:pt-12 mt-40">
        <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="py-8 text-center text-sm text-gray-400">
            © 2024 - Book-Review. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export { Layout };
