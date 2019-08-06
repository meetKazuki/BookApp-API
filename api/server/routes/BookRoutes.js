import { Router } from 'express';
import BookController from '../controllers/BookController';

const router = Router();

router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getABook);
router.post('/', BookController.addBook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

export default router;
