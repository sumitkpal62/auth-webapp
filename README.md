# **Auth WebApp**

This is a full stack web application that supports all CRUD operations and Google OAuth authentication. The project uses a variety of modern technologies to create a robust, secure, and efficient application.

## **Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [Technologies-Used](#technologies-used)
- [Features](#features)

## **Installation**

```bash
     git clone https://github.com/sumitkpal62/auth-webapp.git
     cd auth-webapp
     yarn
```

## Usage

### **Database Setup**

Go to backend directory by `cd api`
Create a .env file in it

Here we used mongodb database as out backend database.

You can simply setup the mongodb database from [MongoDB_Setup](https://cloud.mongodb.com/)

After setting up account put the line shown below in your .env file

> MONGODB_URL = "mongodb+srv://<username>:<password>@cluster0.6cgcs6t.mongodb.net/auth_app"

### Start the backend server

Install all the dependencies using `yarn` or you can also use `npm install`

Go to backend directory by `cd api`

Open terminal and type `npm start` or `npm run` to run the server

### Start the frontend server

Go to frontend directory by `cd client`

Install all the dependencies using `yarn` or you can use `npm install`

Open terminal and type `npm run dev` to run the server

## Technologies-Used

- **Frontend:**

  - React
  - React-Router

- **Backend:**

  - Node.js
  - Express

- **Database:**

  - MongoDB

- **Authentication:**

  - Google OAuth
  - Firebase

- **Security:**
  - JSON Web Tokens (JWT)
  - Cookies

## Features

- Full support for Create, Read, Update, and Delete (CRUD) operations.
- Secure user authentication via Google OAuth.
- Smooth navigation using React-Router.
- Secure session management with JWT and cookies.
- Efficient communication between frontend and backend using a RESTful API.

You can try the website deployed on the render. [Website](https://auth-webapp-06l4.onrender.com/)
