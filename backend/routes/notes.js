const Router = require('express');
const router = Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/note")
const Share = require("../models/share")

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
    ],
    async (req, res) => {
        try {
            // Check if there are any errors in validating the user inputs
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title } = req.body;

            // Adds a new note to the Database
            const newNote = await Notes.create({
                user: req.user.id,
                title: title,
                contents: {data: ""}
            })
            res.send(newNote);

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error!!!")
        }
    });


    
const io = require('socket.io')(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
const defaultValue = "";

router.get('/document/:id', async (req, res) => {
    if (req.params.id == null) return;

    const document = await Notes.findById(req.params.id);
    if (document) res.json(document);
    else{
        console.log('doc error')
    }
});

async function findOrCreateDocument(id) {
    if (id == null) return;

    const document = await Document.findById(id);
    if (document) return document;
    return await Document.create({ _id: id, data: defaultValue });
}


// 3: Update an existing note of a user using PUT /api/notes/update-note. Login Required
router.put('/update-document/:id', fetchuser,
    async (req, res) => {

        try {
            const { title, content} = req.body;
            let newNote = {};
            // Check the the incoming req has any items that need to be updated
            if (title) { newNote.title = title }
            if (content) { newNote.contents = content }

            // Will fetch the notes with the particular 'id' from the DB
            let note = await Notes.findById(req.params.id)
            if (!note) { return res.status(404).send("Not Found!!!") }

            let sharedDoc = await Share.findOne({docId: req.params.id})
            console.log(sharedDoc)
            // Checks if the sign in user is accessing his own notes only
            if (req.user.id !== note.user.toString() && sharedDoc == null) {
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
                let deletedDoc = await Share.deleteMany({docId:req.params.id})
                let deletedDocument = await Notes.findByIdAndDelete(req.params.id)
                res.json({ deletedDocument })
            }

            else{
                // find the note to be deleted using the note id and not the user id
                 // this will delete the document and return it as well
                // let deletedNote = await Notes.deleteOne({_id : req.params.id})  // this will only delete the document but not return it
                let deletedDoc = await Share.deleteMany({docId:req.params.id})
                let deletedDocument = await Notes.findByIdAndDelete(req.params.id)
                res.json({ deletedDocument })
            }
            

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error!!!")
        }

    });


module.exports = router