import express from 'express';
import { create, productById, list, read, remove, update } from '../controllers/product';
const router = express.Router();

//list product
router.get('/products', list)

// product detail
router.get('/product/:productId', read)

//delete product
router.delete('/product/:productId', remove)

//update product
router.put('/product/:productId', update)

//param
router.param('productId', productById)

// add product
router.post('/products', create)

module.exports = router;