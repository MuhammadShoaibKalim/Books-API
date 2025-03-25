# Express.js Bookstore REST API

## Introduction
This is a REST API for managing a bookstore, built with Express.js and MongoDB. It provides CRUD operations for books and user authentication.

## Installation
1. Install Node.js and npm.
2. Clone this repository.
3. Navigate to the project directory.
4. Run `npm install` to install dependencies.
5. Set up your `.env` file with MongoDB URI and JWT secrets.

## Usage
To start the server, use the command:
```sh
npm start
```
The server will start listening on port `8080` by default.

## Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and get a JWT token.

### Books
- `GET /api/books` - Get all books.
- `GET /api/books/:id` - Get a book by ID.
- `POST /api/books` - Create a new book (Admin only).
- `PUT /api/books/:id` - Update a book by ID (Admin only).
- `DELETE /api/books/:id` - Delete a book by ID (Admin only).

### Users (Admin Only)
- `GET /api/users` - Get all users.
- `DELETE /api/users/:id` - Delete a user by ID.

### Orders
- `POST /api/orders` - Create a new order.
- `GET /api/orders/:userId` - Get orders for a user.
- `PUT /api/orders/:id` - Update order status (Admin only).

## Validation
- Book titles must be at least 3 characters long.
- Users must provide a valid email and password during registration.

## Sample Requests
Use Postman or a similar tool to test the API.

### Example: Create a New Book
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925,
  "price": 10.99
}
```

## Contributing
Contributions are welcome! Submit bug reports or feature requests via GitHub issues.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.