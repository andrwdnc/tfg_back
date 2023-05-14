const mongoose = require("mongoose");

const eventosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
    require: true,
  },
  tickets: {
    type: Number,
    require: true,
  } 
});

const Evento = mongoose.model("Eventos", eventosSchema);
module.exports = Evento;
