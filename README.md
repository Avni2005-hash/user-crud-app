## 👤 User Management System

A simple **User Management System** built using **Node.js, Express.js, EJS, and MySQL**. It allows users to be added, viewed, edited, and deleted from a MySQL database.

## 🛠️ Technologies Used

- 🟢 **Node.js**
- 🚂 **Express.js**
- 🗄️ **MySQL**
- 🎨 **EJS**
- 🔄 **Method-Override**
- 🎲 **Faker.js**

## ✨ Features

- 👥 View all users
- ➕ Add a new user
- ✏️ Edit a user's username
- 🗑️ Delete a user
- 🔢 Display the total number of users
- 🔐 Password verification before editing a username
- 🗃️ Store user details in MySQL

## 🔗 Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Displays total number of users |
| GET | `/user` | Displays all users |
| GET | `/user/add` | Shows add-user form |
| POST | `/user/add` | Adds a new user |
| GET | `/user/:id/edit` | Shows edit form |
| PATCH | `/user/:id` | Updates username |
| DELETE | `/user/:id` | Deletes a user |
