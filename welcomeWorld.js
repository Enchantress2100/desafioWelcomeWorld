//creacion de servidor
const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer(function (req, res) {
    const params = url.parse(req.url, true).query
    const archivo = params.archivo
    const contenido = params.contenido
    const nuevoArchivo = params.nuevoArchivo
    
//creacion de archivo
    if (req.url.includes('/crear')) {
        fs.writeFile(archivo, contenido, (err, data) => {
            if (err) {
                res.write('no se pudo crear el archivo')
                res.end()
            } else {
                res.write('Archivo creado con exito')
            console.log('archivo creado con éxito')
            res.end()
            }
        
        })
    }
//leer el archivo creado
    if (req.url.includes('/leer')) {
        fs.readFile(archivo, (err, data) => {
            if (err) {
                res.write('no se puede leer el archivo')
                res.end()
            } else {
               res.write(data)
            console.log('archivo leído con exito')
            res.end() 
            }  
        }) 
    }
//renombrar el archivo creado
    if (req.url.includes('/renombrar')) {
        fs.rename(archivo, nuevoArchivo, (err, data) => {
            if (err) {
                res.write('no se pudo renombrar el archivo')
                res.end()
            } else {
            res.write(`archivo ${archivo} renombrado con exito como: ${nuevoArchivo}`)
            console.log('archivo renombrado con exito')
            res.end()
            }  
        })
    }
//eliminar el archivo creado
    if (req.url.includes('/eliminar')) {
        console.log(`se está procesando la eliminación del archivo ${nuevoArchivo}`);
        function eliminar() {
              fs.unlink(nuevoArchivo, (err, data) => {
                if (err) {
                    res.write('no se pudo borrar el archivo')
                    res.end()
                } else {
                    res.write(`archivo ${nuevoArchivo} borrado con exito`)
                    console.log('archivo borrado con exito')
                    res.end() 
                }    
            })   
        }            
        setTimeout(eliminar, 3000);
    }
}).listen(8080, () => console.log('servidor arriba y funcionando OK'))