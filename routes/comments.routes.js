const express = require('express');
const router = express.Router();
const commentsController =  require('../controllers/comments.controller');

router.get('/new/:bookId', commentsController.create);
router.post('/', commentsController.doCreate);

router.get('/:id/edit', commentsController.edit);
router.post('/:id', commentsController.doEdit);

router.post('/:id/delete', commentsController.delete);

module.exports = router;
