import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productRouter from './routes/product';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//cấu hình app
const app = express();
dotenv.config();

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
app.use(bodyParser.json());

//
app.use('/api', productRouter);

//
app.use(morgan('dev'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})