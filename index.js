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


//agrego base de datos
const { options } = require("./db/mariaDB");
const knex = require("knex")(options);

//agrego base qlite
const knexQlite = require("knex")({
  client: "sqlite3",
  connection: { filename: "./db/ecommerce.sqlite" },
  useNullAsDefault: true,
});

let productsHC = [];

function getProducts(){

  knex.from('products').select({
    id: 'id',
    title: 'title',
    price: 'price',
    thumbnail: 'thumbnail'
  })
  
  // .then((products)=> {
  //   return res.json(products);
  // })
  .then((rows) => {
    // for (row of rows) {
      
      // let productsdb = (`{id:${row['id']}, title:${row['title']}, price:${row['price']}, ${row['thumbnail']}`)
  
      //lo pude hacer con el forEach
     rows.forEach(row => productsHC.push({id:row.id, title:row.title, price:row.price, thumbnail:row.thumbnail }))
      console.log(productsHC)
    })
  
  .catch((err) => { console.log(err); throw err})
  .finally(() => {
    knex.destroy();
  });
}

getProducts()

//parte chat 
let chat = [{
  // email: "admin@admin.com",
  // msg: "bienvenido",
  // date: new Date().toLocaleDateString()
}];

//conexion base de datos sqlite
knexQlite.from('msg').select({
  email: 'email',
   msg: 'msg',
   date: 'date'
  })

.then((rows) => {

    //lo pude hacer con el forEach
   rows.forEach(row => chat.push({email:row.email, msg:row.msg, date:row.date }))
    console.log(chat)
  })

.catch((err) => { console.log(err); throw err})
.finally(() => {
  knexQlite.destroy();
});


io.on('connection', (socket) => {
  console.log("New connection")
  io.sockets.emit('products', productsHC)
  io.sockets.emit('chat', chat)


  socket.on('newMassage', (msg) => {
    //chat.push(msg)

    knexQlite('msg').insert(msg)
.then(() => console.log("mensaje enviado"))
.catch(err => {console.log(err); throw err})
.finally(() => {
  knex.destroy();
});
    chat.push(msg)
    io.sockets.emit('chat', chat)
  });
// fin parte chat





//parte productos
  socket.on('addProduct', (data) => {
   
    const { options } = require("./db/mariaDB");
    const knex = require("knex")(options);

knex('products').insert(data)
.then(() => console.log("producto agregado"))
.catch(err => {console.log(err); throw err})
.finally(() => {
  knex.destroy();
});
    productsHC.push(data)
    io.sockets.emit('products', productsHC)
  });
});

















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
});