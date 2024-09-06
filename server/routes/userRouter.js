const router = require('express').Router();
const userController = require('../controller/userController');
const auth = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.post('/refresh_token', userController.refreshtoken);
router.get('/getuser', auth, userController.getUser)

module.exports = router;