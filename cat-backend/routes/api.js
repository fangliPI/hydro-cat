const express = require('express');
const router = express.Router();
const evalController = require('../controllers/eval');

router.get('/eval_data', evalController.all);
router.get('/eval_data_latest', evalController.findlatest);
router.post('/eval_data', evalController.create);
router.delete('/eval_data/:id', evalController.remove);

module.exports = router;
