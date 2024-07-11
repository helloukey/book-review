import { useState } from "react";
import type { User } from "../types/data";
import { detailsOptions } from "../helpers/details";
import { updateUser } from "../apis/user";
import { SubmittedBooks } from "./SubmittedBooks";

type Props = {
  user: User | null;
};

const Profile = ({ user }: Props) => {
  const [location, setLocation] = useState(user?.location || "");
  const [age, setAge] = useState(user?.age || "");
  const [work, setWork] = useState(user?.work || "");
  const [dob, setDob] = useState(user?.dob || "");
  const [description, setDescription] = useState(user?.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle profile save
  const handleProfileSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Perform validation
    if (age && (Number(age) < 10 || Number(age) > 100)) {
      setError("Age must be between 10 and 100");
      return;
    }
    if (dob) {
      const dobDate = new Date(dob);
      const currentDate = new Date();
      const diff = currentDate.getFullYear() - dobDate.getFullYear();
      if (diff < 10 || diff > 100) {
        setError("DOB must be between 10 and 100 years ago");
        return;
      }
    }
    if (description && (description.length < 30 || description.length > 500)) {
      setError("Description must be between 30 and 500 characters");
      return;
    }

    const details = detailsOptions(
      location,
      Number(age),
      work,
      dob,
      description
    );

    try {
      setLoading(true);
      const data = await updateUser(details);
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
    <div className="bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Hi, {user?.username}
          </h2>
        </div>

        <form
          className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2"
          onSubmit={handleProfileSave}
        >
          <div>
            <label
              htmlFor="username"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Username*
            </label>
            <input
              name="username"
              required
              disabled
              defaultValue={user?.username}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring disabled:bg-gray-200"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Email*
            </label>
            <input
              name="email"
              required
              disabled
              defaultValue={user?.email}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring disabled:bg-gray-200"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="location"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Location
            </label>
            <input
              name="location"
              defaultValue={user?.location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="age"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              defaultValue={user?.age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="work"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Work
            </label>
            <input
              name="work"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              defaultValue={user?.work}
              onChange={(e) => setWork(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="dob"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              DOB
            </label>
            <input
              type="date"
              name="dob"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              defaultValue={user?.dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Description
            </label>
            <textarea
              name="description"
              className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              defaultValue={user?.description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {/* Error */}
          {error && <p className="text-md text-red-500">{error}</p>}

          <div className="flex items-center justify-end sm:col-span-2">
            <button
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      {/* Submitted Books */}
      <SubmittedBooks />
    </div>
  );
};

export { Profile };
