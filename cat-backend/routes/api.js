const express = require('express');
const router = express.Router();
const auth = require('../auth');
const userController = require('../controllers/users');
const evalController = require('../controllers/eval');
const uploadController = require('../controllers/upload');

router.get('/users', auth, userController.getUser);
router.post('/user_register', userController.registerNewUser);
router.post('/user_login', userController.loginUser);
//router.get('/me', auth, userController.getUserDetails);
router.delete('/users/:id', auth, userController.removeUser);

router.get('/eval_data', evalController.all);
router.get('/eval_data_latest', evalController.findlatest);
router.post('/eval_data', evalController.create);
router.delete('/eval_data/:id', evalController.remove);

router.post('/upload', uploadController.upload);

module.exports = router;