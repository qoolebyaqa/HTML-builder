const path = require ('path');
const fs = require ('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const fileExist = __dirname + '/text.txt';


fs.stat(fileExist, (err) => {
    if (!err) {
        console.log('You forgot to delete the .txt file.');
        const rline = readline.createInterface({input, output});
        rline.question('Should I delete it instead you?  y/n\n', (reply) => {
            if (reply = 'y' || 'Y') {
                fs.unlink(fileExist, function(err) {
                    if(err) {
                        throw err;
                    }
                    else {
                        console.log('File was deleted, you can relaunch the script');
                        rline.close();
                    }
                })
            }
            else {
                rline.close();
            }
        })
    }
    else {
        let stream = new fs.createWriteStream(fileExist);
        const rline = readline.createInterface({input, output});
        rline.question('You are officialy invited to put some text in my .txt file ~ iuay \n', (reply) => {            
            if (reply === 'exit') {
                rline.close();
            }
            else {
                stream.write(reply + '\n');
                rline.on('line', (input) => {
                    if (input === 'exit') {
                        rline.close();
                    }
                    else {                        
                        stream.write(input+'\n');
                    }
                })
            }           
        });
        rline.on('close', () => {
            console.log('Please come back!');
        })
    }
})



