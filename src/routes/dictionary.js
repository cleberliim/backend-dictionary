const express = require('express');
const dictionaryController = require('../controllers/dictionary');
const router = express.Router();

router.get('/entries/en', dictionaryController.getWords);

module.exports = router;
