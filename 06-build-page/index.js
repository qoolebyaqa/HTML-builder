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
                   
            if (err) {        
                console.log(err);
                const obj1 = {};
                for (let i = 0; i < files.length; i++) {
                    if (files[i].slice(files[i].lastIndexOf('.')+1) === 'html') {
                        const fileToRead = (htmlFolder + '/' + files[i]);
                        fs.readFile(fileToRead, function(err, data) {
                            if (err) {
                                reject(err);                            
                            }
                            const content = data.toString();
                            obj1[files[i]]= content;
                            resolve(obj1);  
                        });
                    }
                }              
                            
            } 
            else {
                const obj1 = {};
                for (let i = 0; i < files.length; i++) {
                    if (files[i].slice(files[i].lastIndexOf('.')+1) === 'html') {
                        const fileToRead = (htmlFolder + '/' + files[i]);
                        
                        fs.readFile(fileToRead, function(err, data) {
                            if (err) {
                                reject(err);
                            }
                            const content = data.toString();
                            obj1[files[i]]= content;
                            resolve(obj1);
                        });
                    }
                }              
                
            }
                
        });
            
    })
        
    toArrayHtml.then(obj1_prom => {
        const htmlToRead = (__dirname+'/template.html');
        let streamRead = fs.createReadStream(htmlToRead);
        streamRead.on('readable', (err) => {
            if (err) {
                throw err;
            }
            let text = streamRead.read();
            if (text) {
                const arrStr = text.toString().split('');
                const arrNames = [];
                const arrNames2 = [];
                fs.readdir(htmlFolder, (err, files) => {
                    if (err) console.log(err);
                    for (let value of files) {
                        arrNames.push(`{{${value.slice(0, value.lastIndexOf('.'))}}}`);
                        arrNames2.push(value);
                    }
                    
                    if (arrNames.length > 3) {
                        let result = arrStr.join('').replaceAll(arrNames[0], obj1_prom[arrNames2[0].toString()]).replaceAll(arrNames[1], obj1_prom[arrNames2[1].toString()]).replaceAll(arrNames[2], obj1_prom[arrNames2[2].toString()]).replaceAll(arrNames[3], obj1_prom[arrNames2[3].toString()]);
                        
                        const strtoHTML = result;
                        fs.writeFile(htmlBundle, strtoHTML, err => {
                            if (err) {
                                throw err;
                            }
                        }) 
                    }
                    else {
                        let result = arrStr.join('').replaceAll(arrNames[0], obj1_prom[arrNames2[0].toString()]).replaceAll(arrNames[1], obj1_prom[arrNames2[1].toString()]).replaceAll(arrNames[2], obj1_prom[arrNames2[2].toString()]);
                        
                        const strtoHTML = result;
                        fs.writeFile(htmlBundle, strtoHTML, err => {
                            if (err) {
                                throw err;
                            }
                        }) 
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
                        const deletePromise = new Promise((resolve, reject) => {
                            fs.readdir(newFolder, (err, files) => {
                                if (err) {
                                    reject(newFolder);
                                }
                                
                                files.forEach((value) => {
                                    fs.unlink((newFolder+'/'+value), err => {
                                        if (err){}
                                    })
                                });
                                resolve(newFolder);
                            });
                        })
                        deletePromise.then(newFolder => {
                            for (let file of files) {
                                oldPath = oldFolder + '/' + file;
                                newPath = newFolder + '/' + file;
    
                                
                                fs.copyFile(oldPath, newPath, (err) => {
                                    if (err) {
                                        throw err;
                                    }
                                })
                            }
                        }); 
                        
                    })
                };
            })
        }
    })
}) 













        
