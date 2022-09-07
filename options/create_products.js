//agrego base de datos
const { options } = require("../db/mariaDB");
const knex = require("knex")(options);


//creo la tabla de productsHC

knex.schema
  .createTable("products", (table) => {
    table.increments("id"),
    table.string("title"),
    table.integer("price"),
    table.string("thumbnail");
  })
  .then(() => {
    console.log("todo bien");
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  });