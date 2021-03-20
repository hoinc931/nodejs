import Product from '../models/product';

export const create = (req, res) => {
    const product = new Product(req.body);
    product.save((err, data) => {
        if(err){
            res.status(400).json({
                error: "Add product failed"
            });
        }
        
        res.json(data);
    })

}