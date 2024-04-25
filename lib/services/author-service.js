import authorRepository from '../repositories/author-repository.js';

class authorService {
  async createAuthor(name, country, birthDate) {
    const authorData = { name, country, birthDate };
    return await authorRepository.create(authorData);
  }

  async getAllAuthors() {
    return await authorRepository.getAll();
  }

  async deleteAuthor(id) {
    return await authorRepository.deleteById(id);
  }
}

export default new authorService();
