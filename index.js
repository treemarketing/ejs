const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//linea de configuracion 
app.set('view engine', 'ejs');

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/products', (req, res) => {
  res.render('pages/products', { title: 'listado de productos', products: productsHC });
});


app.get('/products/:id', (req, res) => {
  let {id} = req.params;
  const found = productsHC.find((e) => e.id == id);
  if (found) {
    res.render('pages/product', { title: 'UN SOLO PRODUCTO', product: found });

  }else{
    res.render('pages/error', { msg: 'salio mal' });
  }
});


app.get('/form', (req, res) => {
  res.render('pages/form');
});

app.post('/products', (req, res) => {
  const {body} = req;
  //guardar en el array
  productsHC.push(body)
  res.redirect(301 ,"/products")
});