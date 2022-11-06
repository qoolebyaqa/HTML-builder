const path = require('path');
const fs = require('fs');

const cssFolder = __dirname+'/styles';
const htmlFolder = __dirname+'/components';
const cssBundle = __dirname+'/project-dist/style.css';
const htmlBundle = __dirname + '/project-dist/index.html';
const dublicateF = __dirname + '/project-dist/assets';
const pathUse = __dirname + '/assets';

fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
    if (err) { 
    }
    const toArrayHtml = new Promise((resolve, reject) => {   
        fs.readdir(htmlFolder, (err, files) => {          
            const arrcontent = [];         
            if (err) {        
                console.log(err);
                for (let i = 0; i < files.length; i++) {
                    if (files[i].slice(files[i].lastIndexOf('.')+1) === 'html') {
                        const fileToRead = (htmlFolder + '/' + files[i]);
                        fs.readFile(fileToRead, function(err, data) {
                            if (err) {
                                reject(err);                            
                            }
                            const content = data.toString();
                            arrcontent.push(content);
                            resolve(arrcontent);  
                        });
                    }
                }              
                            
            } 
            else {
                for (let i = 0; i < files.length; i++) {
                    if (files[i].slice(files[i].lastIndexOf('.')+1) === 'html') {
                        const fileToRead = (htmlFolder + '/' + files[i]);
                        fs.readFile(fileToRead, function(err, data) {
                            if (err) {
                                reject(err);
                            }
                            const content = data.toString();
                            arrcontent.push(content);
                            resolve(arrcontent);
                        });
                    }
                }              
                
            }
                
        });
            
    })
        
    toArrayHtml.then(arrcontent => {
        const htmlToRead = (__dirname+'/template.html');
        let streamRead = fs.createReadStream(htmlToRead);
        streamRead.on('readable', (err) => {
            if (err) {
                throw err;
            }
            let text = streamRead.read();
            if (text) {
                const arrStr = text.toString().split('');
                arrStr.splice(arrStr.indexOf('{', '{', 'h'), 10, arrcontent[1]);
                arrStr.splice(arrStr.indexOf('{', '{', 'f'), 12, arrcontent[0]);
                arrStr.splice(arrStr.indexOf('{', '{', 'h'), 10, arrcontent[2]);
                const strtoHTML = arrStr.join('');            
                fs.writeFile(htmlBundle, strtoHTML, err => {
                    if (err) {
                        throw err;
                    }
                })
                
                
            }
        });
    })
        
        
    let streamWrite = fs.createWriteStream(cssBundle);
    
    fs.readdir(cssFolder, (err, files) => {
        if (err) {
            files.forEach((value) => {
                if (value.slice(value.lastIndexOf('.')+1) === 'css') {
                    const fileToRead = (cssFolder + '/' + value);
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
                    const fileToRead = (cssFolder + '/' + value);
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
            console.log('project-dist was created');
        }
    });
});

fs.mkdir(dublicateF, err => {
    if (err) {
    }
    fs.readdir(pathUse, (err, folders) => {
        if (err) throw err;
        for (let key of folders) {
            let oldFolder = pathUse + '/' + key;
            let newFolder = dublicateF + '/' + key;
            const way = pathUse+'/'+key;
            fs.stat(way, (err, stats) => {
                if (err) {
                    throw err;
                }
                
                if (stats.isDirectory()) {
                    fs.mkdir(newFolder, err => {
                        if (err) { 
                        }
                    });
                    fs.readdir(way, (err, files) => {
                        if (err) { throw err; }
                        for (let file of files) {
                            oldPath = oldFolder + '/' + file;
                            newPath = newFolder + '/' + file;

                            fs.copyFile(oldPath, newPath, (err) => {
                                if (err) {
                                    throw err;
                                }
                            })
                        }
                    })
                };
            })
        }
    })
}) 













        
