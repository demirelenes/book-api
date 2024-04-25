import { Router } from 'express';
const router = Router();
import authorController from '../controllers/author-controller.js';

router.post('/authors', authorController.createAuthor);
router.get('/authors', authorController.getAllAuthors);
router.delete('/authors/:id', authorController.deleteAuthor);

export default router;
