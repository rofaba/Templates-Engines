/*  
ENTREGABLE V BACKEND - MOTORES DE PLANTILLAS
RODRIGO FAURE COMISION 30995
https://github.com/rofaba/backend.git
*/

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();


const productos = 
[
    {
        "title": "Funko Pop Star Wars: The Mandalorian",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/5176rALHhgS._AC_UL480_FMwebp_QL65_.jpg",
        "id": 1
    }
   
];

//SETTINGS
app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')
app.set('views', __dirname + '/public/views')
app.set('port', process.env.PORT || 8080)

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extend: true }))
app.use(express.static(__dirname + '/public'));

//rutas
app.get('/', (req, res) => {
    res.render('form')
    
})

app.get('api/productos', (req, res) => {
    res.render('productos', {productos})

})

app.post('/api/productos', (req, res) => {
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
        res.redirect('/')
    }
    catch (error) {
        console.log('Ha ocurrido un error en el proceso', error)
    }
})


//error404
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/public/404.html')
})

//puerto activo
app.listen(8080, () => {
    console.log('El servidor se encuentra activo en el puerto 8080');
})

