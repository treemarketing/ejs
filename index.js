const express = require('express');
const app = express();
const PORT = 3030;
//IMPLEMENTACION
const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: { origin: '*'},
});

httpServer.listen(process.env.PORT || 8080, () => console.log("SERVER ON"));
 const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
 });

//server.on('error', (error) => console.log(`Error en servidor ${error}`));
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
//parte chat 
let chat = [{
  email: "admin@admin.com",
  msg: "bienvenido",
  date: new Date().toLocaleDateString()
}];


io.on('connection', (socket) => {
  console.log("New connection")
  io.sockets.emit('products', productsHC)
  io.sockets.emit('chat', chat)


  socket.on('newMassage', (msg) => {
    chat.push(msg)
    io.sockets.emit('chat', chat)
  });


  socket.on('addProduct', (data) => {
    productsHC.push(data)
    io.sockets.emit('products', productsHC)
  });
});



// fin parte chat
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
  const lastId = productsHC[productsHC.length - 1];
  
  //agrego bien el body y agrego un id nuevo
  let nuevoId = lastId.id + 1;
  let insertBody = {id: nuevoId, title: body.name, price: body.price, thumbnail: body.thumbnail}
  productsHC.push(insertBody);
 
  //res.redirect(301 ,"/products")
});