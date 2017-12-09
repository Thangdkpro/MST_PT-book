const jwt = require('jsonwebtoken');
var bookController = require('./book.controller');
const User = require('../user/user.model');
const config = require('../../config/database');

module.exports = function(router) {
  router
    .route('/')
    .post(bookController.postBook)
    .get(bookController.getBooks);
  router
    .route('/:id')
    .get(bookController.getBookById)
    .put(bookController.editBook)
    .delete(bookController.deleteBook);

  return router;
};
