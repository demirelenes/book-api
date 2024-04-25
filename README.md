# Book API

Node.js-based API for anonymous creation/getting of books using MongoDB as the database. The API allows you to perform CRUD operations on books.

## Features

- Create a new book with title, author, price, ISBN, language, number of pages, and publisher.
- Retrieve a list of all books or a specific book by ID.
- Update an existing book's information.
- Delete a book by its ID.

## Technologies Used

- Node.js v21.7.3
- Express.js
- MongoDB
- JavaScript (ES6+)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/demirelenes/book-api.git
   ```
2. Install dependencies:
   ```bash
   cd book-api
   npm install
   ```
3. Set up environment variables: Create a .env file in the root directory and define following variable (If you want to run the project on port other than 3000, you can define PORT as well):
   ```
   MONGODB_URI=mongodb+srv://enesdemirel20:123@cluster0.msywuwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
4. Start the app 
   ```
   npm start
   ```
5. To run tests for book endpoints
   ```
   npm test
   ```

## API Endpoints

```POST /api/authors``` Create a new author

Request Body
```json
{
  "name": "Franz Kafka",
  "country": "Czech",
  "birthDate": "03.06.1924"
}

```

Response Body
```json
{
  "_id": "123",
  "name": "Franz Kafka",
  "country": "Czech",
  "birthDate": "03.06.1924",
  "__v": 0
}

```

```GET /api/authors``` Retrieve all authors

```DELETE /api/authors/:id``` Delete an author by ID

```POST /api/books``` Create a new book

Request Body
```json
{
  "title": "The Metamorphosis",
  "author": "123", // ObjectId of Author
  "price": 29.99,
  "isbn": "978-3-16-148410-0",
  "language": "English",
  "numberOfPages": 180,
  "publisher": "Smith"
}

```

Response Body
```json
{
  "_id": "345",
  "title": "The Metamorphosis",
  "author": "123", // ObjectId of Author
  "price": 29.99,
  "isbn": "978-3-16-148410-0",
  "language": "English",
  "numberOfPages": 180,
  "publisher": "Smith",
  "__v": 0
}

```

```GET /api/books``` Retrieve all books

```GET /api/books/:id``` Retrieve a book by ID

```PUT /api/books/:id``` Update a book by ID (Request Body: Fields to update)

```DELETE /api/books/:id``` Delete a book by ID
