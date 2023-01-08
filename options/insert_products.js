//agrego base de datos
const { options } = require("../db/mariaDB");
const knex = require("knex")(options);



let productsHC = [
    { title: 'nike ball', price: 120, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
    { title: 'nike shoes', price: 580, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
    { title: 'adidas shoes', price: 900, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
    { title: 'adidas shoes', price: 1280, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
    { title: 'adidas shoes', price: 1700, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
    { title: 'adidas shoes', price: 2300, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
    { title: 'adidas shoes', price: 2860, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
    { title: 'adidas shoes', price: 3350, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
    { title: 'rebook shoes', price: 4000, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
    { title: 'adidas shoes', price: 4990, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
  ];

//inserto productos
knex('products').insert(productsHC)
.then(() => console.log("data insertada"))
.catch(err => {console.log(err); throw err})
.finally(() => {
  knex.destroy();
});