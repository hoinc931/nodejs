import Product from '../models/product';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

//add product
export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Add product failed"
            })
        }
        const {name, category, description, detail, price} = fields;
        if(!name || !category || !description || !detail || !price){
            return res.status(400).json({
                error: "You should to enter full information!!!"
            })
        }

        let product = new Product(fields);
        if(files.image){
            if(files.image.size > 1000000){
                res.status(400).json({
                    error: "You should upload image size small than 10Mb"
                })
            }
            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.path;
        }
        product.save((err, data) => {
            if(err){
                res.status(400).json({
                    message: "Add product failed"
                })
            }
            res.json(data)
        })
    })

    // const product = new Product(req.body);
    // product.save((err, data) => {
    //     if(err){
    //         res.status(400).json({
    //             error: "Add product failed"
    //         });
    //     }
        
    //     res.json(data);
    // })
}

//product detail
export const productById = (req, res, next, id) => {
    Product.findById(id).exec( (err, product) => {
        if(err || !product){
            res.status(400).json({
                error: "Can not find the product"
            })
        }
        req.product = product;
        next();
    })
}   
export const read = (req, res) => {
    return res.json(req.product)
}

//delete product
export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) => {
        if(err){
            return res.status(400).json({
                message: "Can not delete the product"
            })
        }
        res.json({
            data: deleteProduct,
            message: "Deleted product successfully"
        })
    })
}

//list product
export const list = (req, res) => {
    Product.find((err, data) => {
        if(err){
            error: "Can not find the product"
        }

        res.json({
            data
        })
    })
    // Product.find()
    //     .select("-photo")
    //     //.populate('category')
    //     .exec((err, data) => {
    //         if(err){
    //             error: "Can not find the product"
    //         }
    
    //         res.json({
    //             data
    //         })
    //     })
}

//update product
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Update product failed"
            })
        }
        const {name, description, price} = fields;
        if(!name || !description || !price){
            return res.status(400).json({
                error: "You should to enter full information!!!"
            })
        }

        // const product = new Product(fields);
        let product = req.product;
        product = _.assignIn(product, fields);

        if(files.image){
            if(files.image.size > 1000000){
                res.status(400).json({
                    error: "You should upload image size small than 10Mb"
                })
            }
            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.path;
        }
        product.save((err, data) => {
            if(err){
                res.status(400).json({
                    message: "Update product failed"
                })
            }
            res.json(data)
        })
    })
}

//get image
export const image = (req, res, next) => {
    if (req.product.image.data) {
        res.set("Content-Type", req.product.image.contentType);
        return res.send(req.product.image.data);
    }
    next();
}