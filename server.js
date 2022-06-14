/*  
ENTREGABLE III BACKEND - SERVIDOR CON EXPRESS
RODRIGO FAURE COMISION 30995
https://github.com/rofaba/backend.git
*/

//productos.js {}
const fs = require('fs')

let archivo;
let arrayProductos;

function randomNumber(min,max){
    return Math.floor((Math.random() * (max-min + 1) + min));
  }

class Contenedor {
    constructor(nombre) {
        this.contenedor = nombre
    }

    //método "save": recibe un objeto, lo guarda en archivo y devuelve su id.
    async save(productoNuevo) {
        try {
            const datosExistentes = JSON.parse(await fs.promises.readFile(`./${this.contenedor}`, 'utf-8'));
            arrayProductos = datosExistentes;

            if (arrayProductos.length == 0) {
                productoNuevo.id = 1
            } else {
                const identificadores = [];
                arrayProductos.forEach(element => identificadores.push(element.id));
                productoNuevo.id = (Math.max(...identificadores) + 1);
            }

            arrayProductos.push(productoNuevo);
            let arrayString = JSON.stringify(arrayProductos, null, 2)
            await fs.promises.writeFile(`./${this.contenedor}`, arrayString);
            console.log('Se ha guardado correctamente el producto')
            console.log(productoNuevo)
            console.log(`Se le asignó el Id: ${productoNuevo.id}`)
        }

        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)
        }
    }

    // método "getById()" recibe un id y retorna el objeto con ese id || null si no está.            
    async getById(num) {
        try {
            const datosExistentes = JSON.parse(await fs.promises.readFile(`./${this.contenedor}`, 'utf-8'));
            arrayProductos = datosExistentes;
            const elementoBuscado = arrayProductos.find((element) => element.id == num);
            if (elementoBuscado == undefined) {
                console.log(`No se encuentra ningún elemento con el id: ${num}`)
                return (null)
            } else console.log('Se ha generado el siguioente producto random:')
            console.log(elementoBuscado);
            return elementoBuscado
        }
        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)

        }
    }

    // método "gelAll()" Devuelve un array con los objetos presentes en el archivo
    async getAll() {
        try {
            const datosExistentes = JSON.parse(await fs.promises.readFile(`./${this.contenedor}`, 'utf-8'));

            let arrayProductos = datosExistentes;
            if (arrayProductos.length == 0) {
                console.log('El archivo no contiene productos')
            } else  console.log(arrayProductos);
        }
        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)

        }
    }

    // método "deleteById" recibe un id y elimina el objeto con el id buscado.
    async deleteById(numero) {
        try {
            const datosExistentes = JSON.parse(await fs.promises.readFile(`./${this.contenedor}`, 'utf-8'));
            let arrayProductos = datosExistentes;
            let elementoParaBorrar = arrayProductos.findIndex((element) => element.id == numero);
            if (elementoParaBorrar != -1) {
                arrayProductos.splice((arrayProductos.findIndex((producto) => producto.id == numero)), 1);
                await fs.promises.writeFile(`./${this.contenedor}`, JSON.stringify(arrayProductos, null, 2));
                console.log('El producto ha sido correctamente eliminado')
            } else console.log('No se encuentra el producto con el id solicitado')
        }
        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)
        }
    }

    // método "deleteAll()"  Elimina todos los objetos presentes en al archivo
    async deleteAll() {
        {
            try {
                await fs.promises.writeFile(`./${this.contenedor}`, "[ ]");
                console.log('Se han eliminado todos los productos')

            }

            catch (error) {
                console.log('Ha ocurrido un error en el proceso', error)
            }
        }

    }
}

//se utilizará el archivo llamado productos.txt
archivo = new Contenedor('productos.txt') 

//SERVIDOR CON EXPRESS

const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req,res) =>{
    res.send(" <h3 style='color: green'> El Servidor de Desafío Entregable 3 con Express está activo, bienvenido</h3>")
})

app.get('/productos', (req,res) => {
    archivo.getAll();
    res.send(" <h3 style='color: green'> Se han desplegado todos los productos por consola</h3>")
})
app.get('/productoRandom', async (req,res) =>{

    try {
        const datosExistentes = JSON.parse(await fs.promises.readFile('./productos.txt', 'utf-8'));
        let arrayProductos = datosExistentes;
        if(arrayProductos.length == 0) {'El archivo solicitado no contiene productos'}
        numeroAzar = (randomNumber(1, arrayProductos.length))
        let productoSolicitado = archivo.getById(numeroAzar)
        console.log(productoSolicitado);
        res.send(" <h3 style='color: green'> Un producto al azar se ha desplegado en consola </h3>");
    
    }   
    catch (error) {console.log('Ha ocurrido un error en el proceso', error)
   
}
})
 
app.use((req, res, next) =>{
        res.status(404).sendFile(__dirname + '/public/404.html')
})
app.listen(port, ()=> {
    console.log(`El servidor se encuentra operativo y esperando solicitudes en el puerto ${port}`);
})

/* up-date github */