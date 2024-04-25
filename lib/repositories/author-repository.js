import author from '../models/author.js';
import mongoose from 'mongoose';

class authorRepository {
  async create(authorData) {
    const newAuthor = new author(authorData);
    return await newAuthor.save();
  }

  async getAll() {
    return await author.find();
  }

  async deleteById(id) {
    return await author.findByIdAndDelete(id);
  }
}

export default new authorRepository();
