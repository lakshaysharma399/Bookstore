import express from "express";
import mongoose from 'mongoose';
import { mongoURL } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js"
import cors from 'cors';
const app = express();

app.use(express.json());

app.use(cors());

app.use('/books', booksRoutes);

mongoose.connect(mongoURL).then(() => {
    console.log("app connected to database");

    app.listen(3000, () => {
        console.log("Server has started");
    });
}).catch((error) => {
    console.log(error);
});
