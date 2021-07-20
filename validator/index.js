import formidable from "formidable";

const check = require('express-validator')

export const userSignupValidator = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (error, fields, files) => {
        let errors = [];
        if(fields.name == ""){
            errors = [ ...errors, "Name is requied!"];
        }
        
        if(fields.email.match(/.+\@.+\..+/) == null){
            errors = [...errors, "Email is requied and email must contains @"];
        }else if(fields.email.length < 4 || fields.email.length > 32){
            errors = [...errors, "Email must be between 3 to 32"];
        }
        if(fields.password.match(/\d/) == null){
            errors = [...errors, "Password must contain a number!!"];
        }else if(fields.password.length < 6){
            errors = [...errors, "Password must contain at least 6 characters"];
        }
        // const errors = req.validationErrors()
        if (errors.length != 0) {
            const firstError = errors[0];
            return res.status(400).json({ error: firstError })
        }
        // req.check('name', 'Name is required').notEmpty();

        // req.check('email', 'Email must be between 3 to 32')
        // .matches(/.+\@.+\..+/)
        // .withMessage('Email must contains @')
        // .isLength({
        //     min: 4,
        //     max: 32
        // });
        // console.log(fields.email)
        // req.check('password', 'Password is required').notEmpty()
        // req.check('password')
        //     .isLength(
        //         { min: 6 }
        //     )
        //     .withMessage('Password must contain at least 6 characters')
        //     .matches(/\d/)
        //     .withMessage('Password must contain a number');
        
    })
    next();
}
