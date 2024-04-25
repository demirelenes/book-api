import bookService from '../services/book-service.js';

class bookController {
  async createBook(req, res, next) {
    try {
      // Extract book details from request body
      const { title, author, price, isbn, language, numberOfPages, publisher } = req.body;
      // Call bookService to create a new book
      const newBook = await bookService.createBook(title, author, price, isbn, language, numberOfPages, publisher);
      res.status(201).json(newBook);
    } catch (err) {
      next(err); // Pass any errors to the error handler middleware
    }
  }

  async getAllBooks(req, res, next) {
    try {
      // Retrieve all books from bookService
      const books = await bookService.getAllBooks();
      res.status(200).json(books);
    } catch (err) {
      next(err);
    }
  }

  async getBookById(req, res, next) {
    try {
      // Retrieve book by ID using bookService
      const book = await bookService.getBookById(req.params.id);
      // Throw a 404 error if the book is not found
      if (!book) {
        const error = new Error('Book not found');
        error.status = 404;
        throw error;
      }
      res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  }

  async updateBook(req, res, next) {
    try {
      const { title, author, price, isbn, language, numberOfPages, publisher } = req.body;
      // Call bookService to update the book
      const updatedBook = await bookService.updateBook(req.params.id, { title, author, price, isbn, language, numberOfPages, publisher });
      if (!updatedBook) {
        const error = new Error('Book not found');
        error.status = 404;
        throw error;
      }
      res.status(200).json(updatedBook);
    } catch (err) {
      next(err);
    }
  }

  async deleteBook(req, res, next) {
    try {
      // Call bookService to delete the book
      const deletedBook = await bookService.deleteBook(req.params.id);
      if (!deletedBook) {
        const error = new Error('Book not found');
        error.status = 404;
        throw error;
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}

export default new bookController();
