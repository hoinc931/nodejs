import User from '../models/user';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import formidable from 'formidable';

//
export const signup = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (error, fields, files) => {
        const user = new User(fields);
        user.save( (err, data) => {
            if(err){
                return res.status(400).json({
                    message: "Sign up failed"
                })
            }

            user.salt = undefined;
            user.hashed_password = undefined;
            res.json({data});
        })
    })
    
}
//
export const signin = (req, res) => {
    const form = new formidable.IncomingForm();
    // let email = '';
    // let password = '';
    form.parse(req, (error, fields, files) => {
        const {email, password} = fields;
        User.findOne({ email }, (error, user) => {
            if (error || !user) {
                return res.status(400).json({
                    error: 'User with that email does not exist. Please signup'
                })
            }
            // if user is found make sure email and password match
            // create authenticate method in user model
            if (!user.authenticate(password)) {
                return res.status(401).json({
                    error: 'Email and password not match'
                })
            }
            // generate a signed token with user id and secret (process.env.JWT_SECRET)
            const token = jwt.sign({ _id: user._id }, "hoinc931");
            // persist the token as 't' in cookie with  
            res.cookie('t', token, { expire: new Date() + 9999 });
            // return response with user and token to frontend client user.name
            const { _id, name, email, role } = user;
            
            return res.json(
                {
                    token, user: { _id, email, name, role }
                }
            )
        })
    })
    // find the user base on email
    // const { email, password } = req.body;
    // User.findOne({ email }, (error, user) => {
    //     if (error || !user) {
    //         return res.status(400).json({
    //             error: 'User with that email does not exist. Please signup'
    //         })
    //     }
    //     // if user is found make sure email and password match
    //     // create authenticate method in user model
    //     if (!user.authenticate(password)) {
    //         return res.status(401).json({
    //             error: 'Email and password not match'
    //         })
    //     }
    //     // generate a signed token with user id and secret (process.env.JWT_SECRET)
    //     const token = jwt.sign({ _id: user._id }, "hoinc931");
    //     // persist the token as 't' in cookie with  
    //     res.cookie('t', token, { expire: new Date() + 9999 });
    //     localStorage.setItem('token',token)
    //     // return response with user and token to frontend client user.name
    //     const { _id, name, email, role } = user;
        
    //     return res.json(
    //         {
    //             token, user: { _id, email, name, role }
    //         }
    //     )
    // })
}
//
export const userById = (req, res, next, id) => {
    User.findById(id).exec( (err, user) => {
        if(err || !user){
            res.status(400).json({
                error: "Can not find the category"
            })
        }
        req.user = user;
        next();
    })
}
//
export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: "Sign out successfully"
    })
}
//token
export const requireSignin = expressJwt({
    secret: "hoinc931",
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

//check member
export const isAuth = (req, res, next) => {
    let user = req.user && req.auth && req.user._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            error: "Access Denied!",
        })
    }
    next();
}
//check admin
export const isAdmin = (req, res, next) => {
    if(req.user.role == 0){
        return res.status(403).json({
            error: "Admin resource! Access Denied!!"
        })
    }
    next()
}