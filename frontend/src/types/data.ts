type User = {
  _id: string;
  email: string;
  username: string;
  location: string;
  age: number;
  work: string;
  dob: string;
  description: string;
  verified: boolean;
};

type Book = {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  submittedBy: string;
};

type Review = {
  _id?: string;
  book: string;
  user?: User;
  review: string;
  rating: string;
  createdAt?: string;
  updatedAt?: string;
};

export type { User, Book, Review };
