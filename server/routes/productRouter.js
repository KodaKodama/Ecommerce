const router = require('express').Router();
const productController = require('../controller/productController')

router.route('/products')
.get(productController.getProducts)
.post(productController.createProducts)

router.route('/products/:id')
.delete(productController.deleteProduct)
.put(productController.updateProduct)

module.exports = router;