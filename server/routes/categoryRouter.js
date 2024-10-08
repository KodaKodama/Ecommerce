const router = require('express').Router();
const categoryController = require('../controller/categoryController')
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router.route('/category')
.get(categoryController.getCategory)
.post(auth,authAdmin,categoryController.createCategory);

router.route('/category/:id')
.delete(auth, authAdmin, categoryController.deleteCategory)
.put(auth, authAdmin, categoryController.updateCategory)

module.exports = router;