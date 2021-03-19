import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productRouter from './routes/product';
import bodyParser from 'body-parser';

//cấu hình app
const app = express();
dotenv.config();

//
app.use(bodyParser.json());

//
app.use('/api', productRouter);

//
app.use(morgan('dev'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})