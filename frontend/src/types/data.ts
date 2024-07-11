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

export type { User, Book };
