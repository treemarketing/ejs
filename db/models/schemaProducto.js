import mongoose from "mongoose";



const schemaMensaje = new mongoose.Schema({
  author:{
    id : { type: String, required: true },
    nombre: { type: String, required: true, max: 100 },
    apellido: { type: String, required: true, max: 100 },
    edad : { type: Number, required: true },
    alias: { type: String, required: true, max: 100 },
    avatar : { type: String, required: true },
    

  },
 text: { type: String, required: true}, 
 time : { type: String, required: true }});

module.exports = mongoose.model('Mensaje', schemaMensaje);