const path = require('path');
const fs = require('fs');

const pathUse = __dirname+'/styles';
const fileExist = __dirname + '/project-dist/bundle.css';

let streamWrite = fs.createWriteStream(fileExist);

fs.readdir(pathUse, (err, files) => {
    if (err) {
        files.forEach((value) => {
            if (value.slice(value.lastIndexOf('.')+1) === 'css') {
                const fileToRead = (pathUse + '/' + value);
                let streamRead = fs.createReadStream(fileToRead);
                streamRead.on('readable', () => {
                let text = streamRead.read();
                if (text) {
                    streamWrite.write(text);
                }           
                streamRead.pause();      

            });
            }
        });
        console.log('bandle.css was created');
    }
    else {
        files.forEach((value) => {
            if (value.slice(value.lastIndexOf('.')+1) === 'css') {
                const fileToRead = (pathUse + '/' + value);
                let streamRead = fs.ReadStream(fileToRead);                
                streamRead.on('readable', () => {
                let text = streamRead.read();
                if (text) {
                    streamWrite.write(text);
                }
                streamRead.pause();  

            });
            }
        });
        console.log('bandle.css was created');
    }
});


        
