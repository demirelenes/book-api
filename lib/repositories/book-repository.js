import book from '../models/book.js';
import mongoose from 'mongoose';

class bookRepository {
  async create(bookData) {
    const newBook = new book(bookData);
    return await newBook.save();
  }

  async getAll() {
    return await book.find();
  }

  async getById(id) {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid book ID');
      error.status = 400;
      throw error; // Throw a 400 Bad Request error if the ID is invalid
    }

    return await book.findById(id);
  }

  async getByISBN(isbn) {
    return await book.findOne({ isbn });
  }

  async update(id, updatedBookData) {
    return await book.findByIdAndUpdate(id, updatedBookData, { 
      new: true, // Return the updated book instead of the original
      runValidators: true
    });
  }

  async deleteById(id) {
    return await book.findByIdAndDelete(id);
  }
}

export default new bookRepository();
