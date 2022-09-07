//agrego base qlite
const knex = require("knex")({
    client: "sqlite3",
    connection: { filename: "../db/mydb.sqlite" },
    useNullAsDefault: true,
  });



//creo la tabla de productsHC

knex.schema
  .createTable("msg", (table) => {
    table.string("email"),
    table.integer("msg"),
    table.timestamp("date").defaultTo(knex.fn.now());
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