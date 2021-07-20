import express from 'express';
import { create, blogById, list, read, remove, update } from '../controllers/blog';
const router = express.Router();

//list blog
router.get('/blogs', list)

//  detail blog
router.get('/blog/:blogId', read)

//delete blog
router.delete('/blog/:blogId', remove)

//update blog
router.put('/blog/:blogId', update)

// add blog
router.post('/blogs', create)

//param blog
router.param('blogId', blogById)

module.exports = router;