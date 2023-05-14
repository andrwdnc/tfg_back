const express = require("express");
const app = express();
const port = process.env.port || 3000;
const version = "v1";

const eventosRoutes = require("./routes/eventos.routes");
const usersRoutes = require("./routes/users.routes");


const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const session = require("express-session");
const jwt = require('jsonwebtoken');
const secretKey = 'clave_secreta';

const sessionOptions = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
};

app.use(cors());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionOptions));

async function conectarMongoDB() {
  return mongoose.connect("mongodb://127.0.0.1:27017/salaPlay");
}

app.use(`/api/${version}/eventos`, eventosRoutes);
app.use(`/api/${version}/usuarios`, usersRoutes);

// ENCENDIDO DEL SERVIDOR
app.listen(port, async () => {
  console.log("listening on port...  " + port);
  try {
    await conectarMongoDB()
      .then(() => {
        console.log("Conectado con MongoDB...");
      })
      .catch((err) => {
        console.log(`Error al conectar. Desc: ${err}`);
        process.exit(0);
      });
  } catch (err) {
    process.exit(0);
  }
});
