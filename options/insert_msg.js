const knex = require("knex")({
    client: "sqlite3",
    connection: { filename: "../db/ecommerce.sqlite" },
    useNullAsDefault: true,
  });


//parte chat 
let chat = [{
    email: "admin@admin.com",
    msg: "bienvenido",
    date: 12/09/2022
  },
  {
    email: "admin@admin.com",
    msg: "bienvenido",
    date: 12/09/2022
  },
  {
    email: "admin@admin.com",
    msg: "bienvenido",
    date: 12/09/2022
  },
  {
    email: "admin@admin.com",
    msg: "bienvenido",
    date: 12/09/2022
  },
  {
    email: "admin@admin.com",
    msg: "bienvenido",
    date: 12/09/2022
  },
  {
    email: "admin@admin.com",
    msg: "bienvenido",
    date: 12/09/2022
  },
  {
    email: "admin@admin.com",
    msg: "bienvenido",
    date: 12/09/2022
  },
  {
    email: "admin@admin.com",
    msg: "bienvenido",
    date: 12/09/2022
  },
  {
    email: "admin@admin.com",
    msg: "bienvenido",
    date: 12/09/2022
  },
  {
    email: "admin@admin.com",
    msg: "bienvenido",
    date: 12/09/2022
  }
];





    knex('msg').insert(chat)
    .then(() => console.log("mensaje agregado"))
    .catch(err => {console.log(err); throw err})
    .finally(() => {
      knex.destroy();
    });