import Contact from '../models/contact'
import formidable from 'formidable';
// import fs from 'fs';
import _ from 'lodash';

//add contact
export const create = (req, res) => {
    // const patternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Add contact failed"
            })
        }
        const { name, title, content, email, phone } = fields;
        if( !name || !title || !content || !email || !phone){
            return res.status(400).json({
                error: "You should to enter full information!!!"
            })
        }
        // else if(email != patternEmail){
        //     return res.status(400).json({
        //         error: "Your email is incorrect."
        //     })
        // }

        const contact = new Contact(fields);
        
        contact.save((err, data) => {
            if(err){
                res.status(400).json({
                    message: "Add contact failed"
                })
            }
            res.json(data)
        })
    })
}

//contact detail
export const contactById = (req, res, next, id) => {
    Contact.findById(id).exec( (err, contact) => {
        if(err || !contact){
            res.status(400).json({
                error: "Can not find the contact"
            })
        }
        req.contact = contact;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.contact)
}

//delete contact
export const remove = (req, res) => {
    let contact = req.contact;
    contact.remove((err, deleteContact) => {
        if(err){
            return res.status(400).json({
                message: "Can not delete the contact"
            })
        }
        res.json({
            data: deleteContact,
            message: "Deleted contact successfully"
        })
    })
}

//list contact
export const list = (req, res) => {
    Contact.find((err, contacts) => {
        if(err){
            error: "Can not find the contact"
        }

        res.json({ contacts })
    })
}

// //update contact
// export const update = (req, res) => {
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//         if(err){
//             return res.status(400).json({
//                 error: "Update contact failed"
//             })
//         }
        // const { name, title, content, email, phone } = fields;
        // if( !name || !title || !content || !email || !phone){
        //     return res.status(400).json({
        //         error: "You should to enter full information!!!"
        //     })
        // }

//         // const contact = new contact(fields);
//         let contact = req.contact;
//         contact = _.assignIn(contact, fields);

//         // if(files.image){
//         //     if(files.image.size > 1000000){
//         //         res.status(400).json({
//         //             error: "You should upload image size small than 10Mb"
//         //         })
//         //     }
//         //     contact.image.data = fs.readFileSync(files.image.path);
//         //     contact.image.contentType = files.image.path;
//         // }
//         contact.save((err, data) => {
//             if(err){
//                 res.status(400).json({
//                     message: "Update contact failed"
//                 })
//             }
//             res.json(data)
//         })
//     })
// }