const express = require('express');
const router = express.Router();

const User =  require('../models/user')
const Note = require('../models/note')
const Share = require('../models/share')

const fetchuser = require('../middleware/fetchuser')

router.post('/add-share', fetchuser, async (req, res) => {
    const { email, docId } = req.body;

    const existingUser = await User.find({ email: email});
    const existingNote = await Note.findById(docId);
    if (!existingUser || !existingNote) {
        return res.status(404).json({ message: 'Email or note not found' });
    }

    const doc = new Share({
        email: email,
        docId: docId
    });

    const shareDoc = await Share.findOne({ email:email, docId: docId })
    if (shareDoc){
        console.log(shareDoc)
        return res.status(400).json({ 'message': 'Document already shared'})
    }
    const sender = await User.findById(req.user.id)


    if (sender.email==email){
        return res.status(400).json({ 'message': 'Document already shared'})
    }

    const savedDoc = await doc.save();
    res.status(201).json(savedDoc);
});

router.get('/fetch-share', fetchuser, async (req, res) => {
    userId = req.user.id;
    const current_user = await User.findById(userId);

    const email = current_user.email;

    const sharedDocs = await Share.find({ email: email });
    let docs = []
    for (let sharedDoc of sharedDocs) {
        const doc = await Note.findById(sharedDoc.docId);
        docs.push(doc);
    }
    res.send(docs);

});


module.exports = router;


