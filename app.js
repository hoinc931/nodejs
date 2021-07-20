import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import expressValidator from 'express-validator';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
const app = express();
dotenv.config();



import productRouter from './routes/product';
import categoryRouter from './routes/category';
import blogRouter from './routes/blog';
import contactRouter from './routes/contact';
//api auth
// import Auth from './routes/auth'
const Auth = require('./routes/auth');

//connection to mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: false,
    useCreateIndex: true
}).then(() => {
    console.log("Connect to mongodb successfully");
});

mongoose.connection.on('Error', err => {
    console.log(`Data connect failed, ${err.message}`)
})

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//-------------------API----------------
//routes products
app.use('/api', productRouter);

//routes categories
app.use('/api', categoryRouter);

//routes blog
app.use('/api', blogRouter);

//routes contact
app.use('/api', contactRouter);
// ----------END API------------

// --------------- AUTH API----------------------
//router signin
app.use('/api', Auth)

// ----------------END AUTH API=============
//


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})