const Router = require('express');
const router = Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/note")

// 1: Fetches all notes of the particular user using GET at /fetch-all-notes. Login Required
router.get('/fetch-documents', fetchuser,
    async (req, res) => {
        try {
            const notes = await Notes.find({ user: req.user.id });
            res.send(notes);
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error!!!")
        }
    });

// 2: Create a new note of a user using POST at /add-note. Login Required
router.post('/add-document', fetchuser,
    [
        body('title').isLength({ min: 3 }),
        body('description', 'Description should be atleast 8 character').isLength({ min: 8 })
    ],
    async (req, res) => {
        try {
            // Check if there are any errors in validating the user inputs
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, tag } = req.body;

            // Adds a new note to the Database
            const newNote = await Notes.create({
                user: req.user.id,
                title: title,
                description: description,
                tag: tag
            })
            res.send(newNote);

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error!!!")
        }
    });

    
// 3: Update an existing note of a user using PUT /api/notes/update-note. Login Required
router.put('/update-document/:id', fetchuser,
    async (req, res) => {

        try {
            const { title, description, tag } = req.body;
            let newNote = {};
            // Check the the incoming req has any items that need to be updated
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            // Will fetch the notes with the particular 'id' from the DB
            let note = await Notes.findById(req.params.id)
            if (!note) { return res.status(404).send("Not Found!!!") }

            // Checks if the sign in user is accessing his own notes only
            if (req.user.id !== note.user.toString()) {
                return res.status(401).send("Not Allowed!!!")
            }

            // Now the user is accessing his own notes and will finally update the notes
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            // {$set: } - will only update the given values of the main object
            // {new : true } - will update the value directly in the mongoose object without again using .find()

            res.json({ note })

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error!!!")
        }


    });

// 4: Update an existing note of a user using DELETE /api/notes/delete-note. Login Required
router.delete("/delete-document/:id", fetchuser,
    async (req, res) => {

        try {
            // Will fetch the notes with the particular 'id' from the DB
            let note = await Notes.findById(req.params.id)
            if (!note) { return res.status(404).send("Not Found!!!") }

            // Checks if the sign in user is accessing his own notes only
            if (req.user.id !== note.user.toString()) {
                return res.status(401).send("Not Allowed!!!")
            }

            // find the note to be deleted using the note id and not the user id
            let deletedNote = await Notes.findByIdAndDelete(req.params.id) // this will delete the document and return it as well
            // let deletedNote = await Notes.deleteOne({_id : req.params.id})  // this will only delete the document but not return it

            res.json({ deletedNote })

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error!!!")
        }

    });


module.exports = router