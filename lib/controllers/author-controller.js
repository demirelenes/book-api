import authorService from '../services/author-service.js';

class authorController {
  async createAuthor(req, res, next) {
    try {
      const { name, country, birthDate } = req.body;
      const newAuthor = await authorService.createAuthor(name, country, birthDate);
      res.status(201).json(newAuthor);
    } catch (err) {
      next(err);
    }
  }

  async getAllAuthors(req, res, next) {
    try {
      const authors = await authorService.getAllAuthors();
      res.status(200).json(authors);
    } catch (err) {
      next(err);
    }
  }

  async deleteAuthor(req, res, next) {
    try {
      const deletedAuthor = await authorService.deleteAuthor(req.params.id);
      if (!deletedAuthor) {
        const error = new Error('Author not found');
        error.status = 404;
        throw error;
      }
      res.status(200).json({ message: 'Author deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}

export default new authorController();