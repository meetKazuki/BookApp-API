import BookService from '../services/BookService';
import Util from '../utils/Utils';

const util = new Util();

class BookController {
  static async getAllBooks(req, res) {
    try {
      const allBooks = await BookService.getAllBooks();
      if (allBooks.length > 0) {
        util.setSuccess(200, 'Books retrieved', allBooks);
      } else {
        util.setSuccess(200, 'No book found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addBook(req, res) {
    if (!req.body.title || !req.body.price || !req.body.description) {
      util.setError(400, 'Provide complete details');
      return util.send(res);
    }
    const newBook = req.body;
    try {
      const createdBook = await BookService.addBook(newBook);
      util.setSuccess(201, 'Book Added!', createdBook);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateBook(req, res) {
    const alteredBook = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Enter a valid numeric value for ID');
      return util.send(res);
    }

    try {
      const updatedBook = await BookService.updateBook(id, alteredBook);
      if (!updatedBook) {
        util.setError(404, `Cannot find book with ID: ${id}`);
      } else {
        util.setSuccess(200, 'Book updated', updatedBook);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getABook(req, res) {
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Enter a valid numeric value for ID');
      return util.send(res);
    }

    try {
      const theBook = await BookService.getABook(id);
      if (!theBook) {
        util.setError(404, `Cannot find book with ID: ${id}`);
      } else {
        util.setSuccess(200, 'Book found', theBook);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteBook(req, res) {
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Enter a valid numeric value for ID');
      return util.send(res);
    }

    try {
      const bookToDelete = await BookService.deleteBook(id);
      if (bookToDelete) {
        util.setSuccess(200, 'Book deleted');
      } else {
        util.setError(404, `Cannot find book with ID: ${id}`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default BookController;
