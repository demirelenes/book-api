import bookRepository from '../repositories/book-repository.js';

class bookService {
  async createBook(title, author, price, isbn, language, numberOfPages, publisher) {
    // Check if a book with the same ISBN already exists
    const exists = await bookRepository.getByISBN(isbn);
    if (exists) {
      const error = new Error('A book with the same ISBN already exists');
      error.status = 400; // Throw a 400 Bad Request error if there is a book with the same ISBN already exists
      throw error;
    }
    
    // Prepare book data based on input parameters
    const bookData = { title, author, price, isbn, language, numberOfPages, publisher };
    return await bookRepository.create(bookData);
  }

  async getAllBooks() {
    return await bookRepository.getAll();
  }

  async getBookById(id) {
    return await bookRepository.getById(id);
  }

  async updateBook(id, updatedBookData) {
    return await bookRepository.update(id, updatedBookData);
  }

  async deleteBook(id) {
    return await bookRepository.deleteById(id);
  }
}

export default new bookService();
