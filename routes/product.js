import express from 'express';
import { userById, isAdmin, isAuth, requireSignin } from '../controllers/auth';
import { create, productById, list, read, remove, update, image } from '../controllers/product';
const router = express.Router();

// add product
router.post('/productAdd/create/:userId', requireSignin, isAuth, isAdmin, create)

//list product
router.get('/products', list)

// product detail
router.get('/product/:productId', read)

//delete product
router.delete('/product/:productId', remove)

//update product
router.put('/product/:productId', update)

//get image
router.get('/product/image/:productId', image)

//param
router.param("userId", userById);
router.param('productId', productById)



// add product
// router.post('/product/', same)

module.exports = router;