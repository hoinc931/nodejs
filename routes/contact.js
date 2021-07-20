import express from 'express';
import { create, contactById, list, read, remove } from '../controllers/contact';
const router = express.Router();

//list contact
router.get('/contacts', list)

//  detail contact
router.get('/contact/:contactId', read)

//delete contact
router.delete('/contact/:contactId', remove)

//update contact
// router.put('/contact/:contactId', update)

// add contact
router.post('/contacts', create)

//param contact
router.param('contactId', contactById)

module.exports = router;