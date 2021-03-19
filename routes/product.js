import express from 'express';
const router = express.Router();

//list product
router.get('/products', (req, res) => {
    res.json({
        message: "successfully"
    })
})

// product detail
router.get('/product/:id', (req, res) => {
    res.json({
        id: req.params.id,
        name: "poduct 1"
    })
})

// add product
router.post('/products', (req, res) => {
    // res.json({
        
    // })
    console.log(req.body);

})


module.exports = router;