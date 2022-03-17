const router=require('express').Router();
const Notes=require('../db/notes');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const { ok } = require('assert');
const notes = require('../db/notes');

// GET all notes - read the `db.json` file and return all saved notes as JSON
router.get('/api/notes', (req, res) => {
    Notes.getNotes().then(notesResponse => res.json(notesResponse)).catch(err=>res.json(err));
})

// ***************************************************************

// `POST /api/notes` receives a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client
router.post("/api/notes", function(req, res) {
    var noteObj = {
        title:req.body.title, 
        text: req.body.text,
        id:uuidv4()
    }
    Notes.getNotes().then(notesResponse => [...notesResponse,noteObj]).then(newNoteArray=>Notes.writefile(newNoteArray)).then(()=> noteObj);

    try {
        res.json({msg:"ok"})
    } catch (error) {
        res.json(error);
    }

})

// `DELETE /api/notes/:id` receives a query parameter that contains the id of a note to delete. All notes are read from the `db.json` file, the note with the given `id` property is removed, and then the notes are rewriten to the `db.json` file
router.delete("/api/notes/:id", function(req, res) {
    Notes.getNotes().then(notesArr=>notesArr.filter(note=>note.id !== req.params.id)).then(newNoteArray=>Notes.writefile(newNoteArray)).then(response=>res.json(response)).catch(err=>res.json(err));
 
}); 

module.exports=router;