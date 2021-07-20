import Blog from '../models/blog'
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

//add blog
export const create = (req, res) => {
    // const patternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Add blog failed"
            })
        }
        const {title, content} = fields;
        if(!title || !content){
            return res.status(400).json({
                error: "You should to enter full information!!!"
            })
        }
        // else if(email != patternEmail){
        //     return res.status(400).json({
        //         error: "Your email is incorrect."
        //     })
        // }

        const blog = new Blog(fields);

        if(files.image){
            if(files.image.size > 1000000){//10mb
                res.status(400).json({
                    error: "You should upload image size small than 10Mb"
                })
            }
            blog.image.data = fs.readFileSync(files.image.path);
            blog.image.contentType = files.image.path;
        }
        blog.save((err, data) => {
            if(err){
                res.status(400).json({
                    message: "Add blog failed"
                })
            }
            res.json(data)
        })
    })
}

//blog detail
export const blogById = (req, res, next, id) => {
    Blog.findById(id).exec( (err, blog) => {
        if(err || !blog){
            res.status(400).json({
                error: "Can not find the blog"
            })
        }
        req.blog = blog;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.blog)
}

//delete blog
export const remove = (req, res) => {
    let blog = req.blog;
    blog.remove((err, deleteBlog) => {
        if(err){
            return res.status(400).json({
                message: "Can not delete the blog"
            })
        }
        res.json({
            data: deleteBlog,
            message: "Deleted blog successfully"
        })
    })
}

//list blog
export const list = (req, res) => {
    Blog.find((err, blogs) => {
        if(err){
            error: "Can not find the blog"
        }

        res.json({ blogs })
    })
}

//update blog
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Update blog failed"
            })
        }
        const { title, content } = fields;
        if(!title || !content){
            return res.status(400).json({
                error: "You should to enter full information!!!"
            })
        }

        // const blog = new blog(fields);
        let blog = req.blog;
        blog = _.assignIn(blog, fields);

        if(files.image){
            if(files.image.size > 1000000){
                res.status(400).json({
                    error: "You should upload image size small than 10Mb"
                })
            }
            blog.image.data = fs.readFileSync(files.image.path);
            blog.image.contentType = files.image.path;
        }
        blog.save((err, data) => {
            if(err){
                res.status(400).json({
                    message: "Update blog failed"
                })
            }
            res.json(data)
        })
    })
}