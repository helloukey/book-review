import type { Book } from "../types/data";

// Add a book
const addBook = async (book: Book) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/book/add",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(book),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding book: ", error);
  }
};

// Get user books
const getUserBooks = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/book/user",
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
    console.error("Error getting user books: ", error);
  }
};

// Get all books
const getAllBooks = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/book/all",
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
    console.error("Error getting all books: ", error);
  }
};

// Delete a book
const deleteBook = async (id: string) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/book/delete/" + id,
      {
        method: "DELETE",
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
    console.error("Error deleting book: ", error);
  }
};

// Get single book
const getBook = async (id: string) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/book/" + id,
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
    console.error("Error getting book: ", error);
  }
};

export { addBook, getUserBooks, getAllBooks, deleteBook, getBook };
