# Book Review

A Complete Book Review WebApp made using ReactJS, NodeJS, ExpressJS and MongoDB.

## Live Preview

* Live preview of this project: [Book Review](https://book-review-frontend-tan.vercel.app/)

## Features

* Simple Responsive Design

* Register and Login Functionality

* OTP Verification

* Add and Remove Book

* Add Review

* Profile Update

* [JWT](https://github.com/auth0/node-jsonwebtoken) Authentication

* User, Book and Review Validation

* Protected Routes

* Password Hashing - [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)

* Custom Error Handling

* 404 Page

## Installation & Setup

* First, download or clone this repo, and then run the command given below to install all the required dependencies.

- Backend:

```bash
  cd backend && npm install
```

- Frontend

```bash
  cd frontend && npm install
```

* Rename the `.env_sample` file to `.env` inside both backend and frontend folder

* Provide your **MONGO_URI**, **FRONTEND_BASE_URL**, **PORT**, **JWT_SECRET**, **GMAIL_ADDRESS** and **GMAIL_PASSWORD** inside the backend folder's `.env` file.

* Provide your **REACT_APP_BACKEND_URL** inside the frontend's `.env` file.

* Run the `node app` or `nodemon app` command inside the backend folder to start the server.

* Run the `npm run start` command inside the frontend folder to spin-up the frontend.

* Finally, Preview this project locally by visiting the URL: `localhost:<PORT number>`

* In production, use `secure` property in cookie parser options object. You can add it inside the `backend/controllers/userController.js` file.

## Feedback

If you have any feedback, please reach out to me at <kunalukey32@gmail.com>

## Authors

* [@helloukey](https://www.github.com/helloukey)