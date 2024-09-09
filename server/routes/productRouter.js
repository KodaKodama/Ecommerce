const router = require('express').Router();
const productController = require('../controller/productController')

router.route('/products')
.get(productController.getProducts)
.post(productController.createProducts)

module.exports = router;