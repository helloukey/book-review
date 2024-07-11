import { Link } from "react-router-dom";
import type { User } from "../types/data";
import { logoutUser } from "../apis/user";
import { useState } from "react";
import { Navbar } from "./Navbar";

type Props = {
  children: React.ReactNode;
  user: User | null;
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
      <Navbar user={user} />
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
