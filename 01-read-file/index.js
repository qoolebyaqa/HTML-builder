const path = require ('path');
const fs = require ('fs');

const fileToRead = (__dirname + '/text.txt');
let stream = new fs.ReadStream(fileToRead);


stream.on('readable', () => {
    let text = stream.read();
    if (text) {
        console.log(text.toString());
    }
});