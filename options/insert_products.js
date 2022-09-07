//agrego base de datos
const { options } = require("../db/mariaDB");
const knex = require("knex")(options);



let productsHC = [
    { title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
    { title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
    { title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
  ];

//inserto productos
knex('products').insert(productsHC)
.then(() => console.log("data insertada"))
.catch(err => {console.log(err); throw err})
.finally(() => {
  knex.destroy();
});