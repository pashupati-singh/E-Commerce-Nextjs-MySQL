# E-Commerce-Nextjs-MySQL

This project is a Node.js application that serves as a backend server for managing user authentication and categories. It utilizes Express.js for routing, Sequelize as an ORM for database interaction, and MySQL as the database.

Features
User Authentication: The application provides routes for user signup, login, and authentication using JSON Web Tokens (JWT).
Category Management: Users can create, retrieve, update, and delete categories.
Database Integration: Sequelize ORM is used to interact with the MySQL database for storing user and category data.
Associations: The application establishes associations between users and their favorite categories.
Prerequisites
Before running this application, make sure you have the following installed:

Node.js
Express.js
MySQL server
bcrypt (bcrypt password before storing into database)
jwt

client:
next.js
tailwind

Copy code
npm install
Create a .env file in the root directory of the project and configure the following environment variables:

HOST=localhost
PASSWORD=<your_mysql_password>

# server
npm run server
Access the application in your web browser at http://localhost:8080.

# client
npm run dev

# Usage
Authentication Routes:

POST /users/register Sign up a new user.
POST /users/login: Log in an existing user.

Category Routes:

GET /category: Get all categories
POST /category/add: Create a new category.
POST /category/addfavourite : Add selected Categories of particular users into database
GET /category/fav : Get selected category

Database Schema
The application uses the following database schema:

users: Table to store user information.
categories: Table to store category information.
user_favourite_categories: Table to establish a many-to-many relationship between users and their favorite categories.






