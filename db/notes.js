//
const fs = require('fs');

const util=require('util');
const readFileAsync=util.promisify(fs.readFile);

// `db.json` file will be used to store and retrieve notes using the `fs` module

class Notes {
    readFile() {
        return readFileAsync('db/db.json', 'utf8');
    }

    writefile(note) {
        return fs.writeFileSync('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.readFile().then(rawNotes => {
            let notesArray;
            try {
                notesArray=[].concat(JSON.parse(rawNotes))
            } catch (error) {
                notesArray=[];
            }
            return notesArray;
        });
    }

}

module.exports=new Notes();