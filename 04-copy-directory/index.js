const path = require('path');
const fs = require('fs');


const pathUse = __dirname+'/files';
const dublicateF = __dirname+'/files-copy'

fs.stat(dublicateF, err => {
    if (!err) {
        console.log('Folder had been already created, the included files were updated');


        fs.readdir(dublicateF, (err, files) => {
            if (err) {
                console.log(err);
            }
            
            files.forEach((value) => {
                fs.unlink((dublicateF+'/'+value), err => {
                    if (err) console.log(err);
                })
            });
            
        });
    }
  
    fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
        if (err) {
            
        }
    });

    fs.readdir(pathUse, (err, files) => {
        if (err) {
            console.log(err);
        }
        else {
            files.forEach((value) => {
                let oldPath = pathUse + '/' + value;
                let newPath = dublicateF + '/' + value;

                fs.copyFile(oldPath, newPath, (err) => {
                    if (err) {
                        throw err;
                    }
                })
            });
        }
    });
    console.log('Files were copied to new folder');
})




