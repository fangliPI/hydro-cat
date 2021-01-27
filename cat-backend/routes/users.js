var express = require('express');
var router = express.Router();
const auth = require('../auth');
const userController = require('../controllers/users');

router.get('/', auth, userController.getUser);
router.post('/register', userController.registerNewUser);
router.post('/login', userController.loginUser);
//router.get('/me', auth, userController.getUserDetails);
router.delete('/:id', auth, userController.removeUser);

module.exports = router;
