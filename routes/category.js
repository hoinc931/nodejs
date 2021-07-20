import express from 'express';
import  { userById, isAdmin, isAuth, requireSignin } from '../controllers/auth'
import { create, categoryById, list, read, remove, update } from '../controllers/category';
import { categoryAddValidator } from '../validator';
const router = express.Router();

// add category
// router.post('/categories', create)
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

//list category
router.get('/categories', list)

//  detail category
router.get('/category/:categoryId', read)

//delete category
router.delete('/category/:categoryId/:userId', remove)

//update category
router.put('/category/:categoryId', update)

//param 
router.param("userId", userById);
router.param('categoryId', categoryById)

module.exports = router;