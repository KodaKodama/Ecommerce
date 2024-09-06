const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.post('/refresh_token', userController.refreshtoken);

module.exports = router;