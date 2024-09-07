const router = require('express').Router();
const categoryController = require('../controller/categoryController')

router.route('/category')
.get(categoryController.getCategory)

module.exports = router;