import express  from "express";
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";

import productRouter from './src/routes/product-routes.js';
import vacancyRouter from './src/routes/vacancy-routes.js';
import userRouter from './src/routes/user-routes.js'
import errorMiddleware from "./src/middlewares/error-middleware.js";
import AdminRouter from './src/routes/admin-routes.js'
import orderRouter from './src/routes/order-routes.js'

const PORT = 3004;
const url = process.env.MONGODB_URI;

const app = express();
app.use(express.json());

app.use(cors({
  credentials:true,
  origin: process.env.CLIENT_URL
}));

app.use(cookieParser());

app.use('/api/products',productRouter);
app.use('/api/vacancies',vacancyRouter);
app.use('/api/auth',userRouter);
app.use('/admin',AdminRouter);
app.use('/api/orders',orderRouter);
app.use(errorMiddleware);


mongoose
    .connect(url)
    .then(() => console.log('Connected to DB'))
    .catch((err) =>{
        if(typeof err === "string"){
            console.log(err)
        }
        if(err instanceof Error){
            console.log(err.message)
        }
    })

app.get('/', (req , res ) => {
    res.send('Hello everyone! This is main page of the confect.. back')

});
app.listen(PORT, (err) => {
    if (err) {
        if (typeof err === "string") {
          return console.log(`Something went wrong while the server was starting. Error: ${err}`);
        }
        if (err instanceof Error) {
          console.error(err.message);
        }
      } else {
        console.log(`Server started on port ${PORT}`);
      }
})