const path = require('path');
const fs = require('fs');

const pathUse = __dirname+'/secret-folder';



fs.readdir(pathUse, (err, files) => {
    if (err) {
        console.log(err);
    }
    else {
        files.forEach((value) => {
            let fileCurrent = pathUse + '/' + value;
            let kb;
            fs.stat(fileCurrent, (err, stats) => {
                if (err) {
                    return;
                }
                else {
                    if (stats.isDirectory()) {
                        
                    }
                    else {
                        let nameF = value.slice(0, value.lastIndexOf('.'));
                        kb = stats.size;
                        console.log(`${nameF} - ${path.extname(value).slice(1)} - ${(kb/1024).toFixed(2) + ' kb'}`);                        
                    }                    
                }
            })
            
        });
    }
});
