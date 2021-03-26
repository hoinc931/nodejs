import Category from '../models/category'
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

//add category
export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Add category failed"
            })
        }
        const {name} = fields;
        if(!name){
            return res.status(400).json({
                error: "You should to enter full information!!!"
            })
        }

        const category = new Category(fields);

        // if(files.image){
        //     if(files.image.size > 1000000){
        //         res.status(400).json({
        //             error: "You should upload image size small than 10Mb"
        //         })
        //     }
        //     category.image.data = fs.readFileSync(files.image.path);
        //     category.image.contentType = files.image.path;
        // }
        category.save((err, data) => {
            if(err){
                res.status(400).json({
                    message: "Add category failed"
                })
            }
            res.json(data)
        })
    })
}

//category detail
export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec( (err, category) => {
        if(err || !category){
            res.status(400).json({
                error: "Can not find the category"
            })
        }
        req.category = category;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.category)
}

//delete category
export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deleteCategory) => {
        if(err){
            return res.status(400).json({
                message: "Can not delete the category"
            })
        }
        res.json({
            data: deleteCategory,
            message: "Deleted category successfully"
        })
    })
}

//list category
export const list = (req, res) => {
    Category.find((err, categories) => {
        if(err){
            error: "Can not find the category"
        }

        res.json({ categories })
    })
}

//update category
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Update category failed"
            })
        }
        const { name } = fields;
        if(!name){
            return res.status(400).json({
                error: "You should to enter full information!!!"
            })
        }

        // const category = new Category(fields);
        let category = req.category;
        category = _.assignIn(category, fields);

        // if(files.image){
        //     if(files.image.size > 1000000){
        //         res.status(400).json({
        //             error: "You should upload image size small than 10Mb"
        //         })
        //     }
        //     category.image.data = fs.readFileSync(files.image.path);
        //     category.image.contentType = files.image.path;
        // }
        category.save((err, data) => {
            if(err){
                res.status(400).json({
                    message: "Update category failed"
                })
            }
            res.json(data)
        })
    })
}