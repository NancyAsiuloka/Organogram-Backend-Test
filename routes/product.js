const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController.js');

const router = express.Router();

router.post('/:merchantId', createProduct);

router.get('/:merchantId', getAllProducts);

router.get('/:merchantId/:productId', getProduct);

router.put('/:merchantId/:productId', updateProduct);

router.delete('/:merchantId/:productId', deleteProduct);

module.exports = router;
