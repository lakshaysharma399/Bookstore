import express  from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear

        ) {
            return res.status(400).send("Send all fields")
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook);
        return res.status(201).json(book);

    } catch (error) {
        res.status(500).send(error);

    }

});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(201).json(books);
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(201).send(book);
})


router.put('/:id', async (req, res) => {

    try {
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishYear) {

            return res.status(400).json("Fill all the fields")

        }
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!book) {
            return res.status(404).json("Book not found");
        }
        return res.status(200).json(book);

    } catch (error) {

        console.log(error)

    }

})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json("book not found");
        }

        return res.status(200).send("deleted")

    } catch (error) {
        console.log(error)

    }

})

export default router;