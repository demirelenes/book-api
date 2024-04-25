import { jest } from '@jest/globals'
import bookController from '../../lib/controllers/book-controller.js';
import bookService from '../../lib/services/book-service.js';

// Mocking the book service module to isolate unit tests
jest.mock('../../lib/services/book-service.js');

const mockedCreateBook = jest.fn();
const mockedGetAllBooks = jest.fn();
const mockedGetBookById = jest.fn();
const mockedUpdateBook = jest.fn();
const mockedDeleteBook = jest.fn();

bookService.createBook = mockedCreateBook;
bookService.getAllBooks = mockedGetAllBooks;
bookService.getBookById = mockedGetBookById;
bookService.updateBook = mockedUpdateBook;
bookService.deleteBook = mockedDeleteBook;

describe('bookController', () => {

   // Tests for the createBook method
  describe('createBook', () => {
    it('should create a new book', async () => {
      const newBook = { 
        title: "The Metamorphosis",
        author: "Author 1",
        price: 30,
        isbn: "98765",
        language: "English",
        numberOfPages: 400,
        publisher: "Smith" 
      }

      // Mock request object with the new book
      const mockReq = { 
        body: newBook
      };

      // Mock response object with status and JSON methods
      const mockRes = { 
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock next function
      const mockNext = jest.fn();

      mockedCreateBook.mockResolvedValue(newBook);

      await bookController.createBook(mockReq, mockRes, mockNext);

      // Status should be 201 (Created), JSON response should match the new book, and next should not be called
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        title: "The Metamorphosis",
        author: "Author 1",
        price: 30,
        isbn: "98765",
        language: "English",
        numberOfPages: 400,
        publisher: "Smith"
      }));
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle errors if book creation fails', async () => {
      const mockReq = { 
        body: { 
          title: "Invalid Book",
          author: "Author 2",
          price: 40,
          isbn: "987654",
          language: "French",
          numberOfPages: 500,
          publisher: "Jones" 
        } 
      };
      const mockRes = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
      };
      const mockNext = jest.fn();
  
      bookService.createBook = jest.fn().mockRejectedValue(new Error('Database connection error'));
  
      await bookController.createBook(mockReq, mockRes, mockNext);
  
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should handle duplicate ISBN error', async () => {
      const mockReq = { 
        body: { 
          title: "The Metamorphosis",
          author: "123",
          price: 29.99,
          isbn: "978-3-16-148410-0",
          language: "English",
          numberOfPages: 180,
          publisher: "Smith" 
        } 
      };
      const mockRes = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
      };
      const mockNext = jest.fn();
  
      bookService.createBook = jest.fn().mockRejectedValue(new Error('A book with the same ISBN already exists'));
  
      await bookController.createBook(mockReq, mockRes, mockNext);
  
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      expect(mockNext.mock.calls[0][0].message).toBe('A book with the same ISBN already exists');
    });
  });

  // Tests for the getAllBooks method
  describe('getAllBooks', () => {
    it('should return all books', async () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();

      const expectedBooks = [
        { 
          title: "Book 1",
          author: "Author 1",
          price: 10,
          isbn: "98765432",
          language: "English",
          numberOfPages: 200,
          publisher: "Smith" 
        },
        {
          title: "Book 2",
          author: "Author 2",
          price: 20,
          isbn: "9876543",
          language: "German",
          numberOfPages: 300,
          publisher: "Johnson"
        }
      ];

      mockedGetAllBooks.mockResolvedValue(expectedBooks);

      await bookController.getAllBooks(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expectedBooks);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle errors if getAllBooks fails', async () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();

      const error = new Error('Database connection error');
      mockedGetAllBooks.mockRejectedValue(error);

      await bookController.getAllBooks(mockReq, mockRes, mockNext);

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  // Tests for the getBookById method
  describe('getBookById', () => {
    it('should return a book by ID', async () => {
      const mockReq = { params: { id: '123' } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();

      const expectedBook = { 
        title: 'Book 1', 
        author: 'Author 1', 
        price: 1,
        isbn: "987654321",
        language: "English",
        numberOfPages: 100,
        publisher: "Jones",
      };

      mockedGetBookById.mockResolvedValue(expectedBook);

      await bookController.getBookById(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expectedBook);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle errors if book not found', async () => {
      const mockReq = { params: { id: '123' } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();

      const error = new Error('Book not found');
      mockedGetBookById.mockResolvedValue(null);

      await bookController.getBookById(mockReq, mockRes, mockNext);

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  // Tests for the updateBook method
  describe('updateBook', () => {
    it('should update a book by ID', async () => {
      const mockReq = {
        params: { id: '123' },
        body: { title: 'Updated Book Title' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();

      const updatedBook = { title: 'Updated Book Title', author: 'Author 1' };

      mockedUpdateBook.mockResolvedValue(updatedBook);

      await bookController.updateBook(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedBook);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle errors if book not found', async () => {
      const mockReq = {
        params: { id: '123' },
        body: { title: 'Updated Book Title' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();

      const error = new Error('Book not found');
      mockedUpdateBook.mockResolvedValue(null);

      await bookController.updateBook(mockReq, mockRes, mockNext);

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  // Tests for the deleteBook method
  describe('deleteBook', () => {
    it('should delete a book by ID', async () => {
      const mockReq = { params: { id: '123' } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();

      const deletedMessage = { message: 'Book deleted successfully' };

      mockedDeleteBook.mockResolvedValue(true);

      await bookController.deleteBook(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(deletedMessage);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle errors if book not found', async () => {
      const mockReq = { params: { id: '123' } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();

      const error = new Error('Book not found');
      mockedDeleteBook.mockResolvedValue(false);

      await bookController.deleteBook(mockReq, mockRes, mockNext);

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
