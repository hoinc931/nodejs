import express from 'express';
import { create, categoryById, list, read, remove, update } from '../controllers/category';
const router = express.Router();

//list category
router.get('/categories', list)

//  detail category
router.get('/category/:categoryId', read)

//delete category
router.delete('/category/:categoryId', remove)

//update category
router.put('/category/:categoryId', update)

//param category
router.param('categoryId', categoryById)

// add category
router.post('/categories', create)

module.exports = router;