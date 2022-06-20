/*  
ENTREGABLE V BACKEND - MOTORES DE PLANTILLAS PUG
RODRIGO FAURE COMISION 30995
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const productos = 
[
    {
        "title": "Funko Pop Star Wars: The Mandalorian",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/5176rALHhgS._AC_UL480_FMwebp_QL65_.jpg",
        "id": 1
      },
      {
        "title": "Funko Pop Televisión: Silicon Valley Gilfoyle",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/41PsLYv3r2L._AC_.jpg",
        "id": 2
      },
      {
        "title": "Funko Pop Star Wars: The Mandalorian",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/51d9zjK3DdL._AC_SX466_.jpg",
        "id": 3
      }
]
 
const data = productos;

//SETTING
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.set('port', process.env.PORT || 8080)

//MIDDLEWARES
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: true }))
app.use(express.static(__dirname + '/static'));

//RUTAS
app.get('/', (req, res) =>{
    res.render('index')
})

app.get('/productos', (req, res) => {
    
    console.log(data)
    
    res.render('productos', {datos: data})
        
    })

    app.post('/productos', (req, res) => {
    try {
        const nuevoProducto = req.body;
        if (productos.length == 0) {
            nuevoProducto.id = 1
        } else {
            const identificadores = [];
            productos.forEach(element => identificadores.push(element.id));
            nuevoProducto.id = (Math.max(...identificadores) + 1);
        }
        productos.push(nuevoProducto)
        console.log('producto guardado')
        console.log(productos)
        res.redirect('/')
    }
    catch (error) {
        console.log('Ha ocurrido un error en el proceso', error)
    }
})

    //ERROR 404
    app.use((req, res, next) => {
    res.status(404).render('404')
})

//PORT
app.listen(8080, () => {
    console.log('El servidor se encuentra activo en el puerto 8080');
})
