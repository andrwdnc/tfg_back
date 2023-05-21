const Users = require("../models/users.model");
const logger = require("../logger");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secretKey = 'clave_secreta';

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

function generateToken(user) {
  const payload = {
    sub: user._id,
    name: user.name,
    email: user.email,
  }
  const options = {
    expiresIn: '24h',
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
}


exports.findAll = wrapAsync(async (req, res, next) => {
  try {
    const users = await Users.find();
    logger.access.debug("Acceso a controller 'findAll' ,esquema 'Users'");
    return res.json({ users });
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'findAll', esquema 'Users'"
    );
    return res.status(500).json({ error: "error de servidor" });
  }
});

exports.login = wrapAsync(async (req, res, next) => {
  let msg = "Error en el servidor";
  try {
    const result = await Users.find({
      name: req.body.name,
    });
    
    

    logger.access.debug("Acceso a controller 'login' ,esquema 'users'");
    if (result.length === 1) {
      
      if (bcrypt.compare(req.body.pass, result[0].pass)) {
        return res.json({ result, token: generateToken(result[0]) });
      }
      msg = "Usuario o contraseña incorrecta";
    } else if (result.length === 0) {
      msg = "Usuario o contraseña incorrecta";

      logger.access.debug(
        "No se ha encontrado ningun usuario con ese nombre en la base de datos : " +
          data.name +
          " controller login de 'users'"
      );
    } else {
      logger.error.error("Error en el controller 'login', esquema 'users'");
    }
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'login', esquema 'users'"
    );
    return res.status(500).json({ error: msg });
  }
});

exports.changePass = wrapAsync(async (req, res, next) => {
  let msg = "Error en el servidor.";
  try {
    const result = await Users.find({
      name: req.body.name,
    });
    logger.access.debug("Acceso a controller 'changePass' ,esquema 'users'");
    if (bcrypt.compare(result[0].pass, req.body.actualPass)) {
      result[0].pass = await bcrypt.hash(req.body.actualPass, 12)
      const changeResult = await Users.findByIdAndUpdate(
        result[0]._id,
        result[0],
        {
          runValidators: true,
          new: true,
        }
      );
      if (changeResult) {
        return res
          .status(200)
          .json({ error: "Contraseña guardada correctamente." });
      }
    } else if (result.length === 0) {
      msg = "Contraseña actual erronea.";
      logger.access.debug(
        "No se ha encontrado ningun usuario con esa contraseña en la base de datos : " +
          data.name +
          " controller changePass de 'users'"
      );
    } else {
      logger.error.error("Error en el controller 'login', esquema 'users'");
    }
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'login', esquema 'users'"
    );
    return res.status(500).json({ error: msg });
  }
});

exports.find = wrapAsync(async (req, res, next) => {
  try {
    const user = await Users.find({ name: req.params.name });
    if (user.length === 1) {
      logger.access.debug("Acceso a controller 'findID' ,esquema 'users'");
      return res.json(user[0]);
    } else if (!user) {
      logger.access.debug(
        "No se ha encontrado ningun evento con ese ID en la base de datos : " +
          id +
          " controller findID de 'users'"
      );
    } else {
      logger.error.error("Error en el controller 'findId', esquema 'users'");
    }
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'findID', esquema 'users'"
    );
    return res.status(500).json({ error: "error de servidor" });
  }
});

exports.create = wrapAsync(async (req, res, next) => {
  try {
    if ((await User.find({ name: req.body.name })).length === 0) {
      const newUsers = new Users(req.body);
      newUsers.pass = await bcrypt.hash(newUsers.pass, 12);
      const resultado = await newUsers.save();
      logger.access.debug("Acceso a controller 'create' ,esquema 'users'");
      if (resultado) {
        return res.json({ resultado });
      } else {
        logger.error.error(
          "Error en el controller 'create', esquema 'users', fallo en la creacion de usuario'"
        );
      }
    } else {
      return res.status(500).json({ error: "Nombre de usuario no disponible" });
    }
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'create', esquema 'users'"
    );

    return res.status(500).json({ error: "error de servidor", error });
  }
});

exports.update = wrapAsync(async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await Users.find({
      name: name,
    });
    if (result[0].event === undefined) {
      result[0].event = [
        {
          eventId: req.body.event.eventId,
          numTickets: req.body.event.numTicket,
        },
      ];
    } else {
      const filterEvent = result[0].event.filter(
        (evento) => evento.eventId === req.body.event.eventId
      );

      if (filterEvent.length === 0) {
        result[0].event.push({
          eventId: req.body.event.eventId,
          numTickets: req.body.event.numTicket,
        });
      } else {
        result[0].event.forEach((e) => {
          if (e.eventId === req.body.event.eventId) {
            e.numTickets += req.body.event.numTicket;
          }
        });
      }
    }

    const UserUp = await Users.findByIdAndUpdate(result[0], result[0], {
      runValidators: true,
      new: true,
    });
    logger.access.debug("Acceso a controller 'update' ,esquema 'users'");
    if (UserUp) {
      return res.json({ UserUp });
    } else {
      logger.error.error(
        "Error en el controller 'update', esquema 'eventos', fallo en la actualizacion del users'"
      );
    }
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'update', esquema 'users'"
    );
    return res.status(500).json({ error: "error de servidor" });
  }
});

exports.delete = wrapAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await Users.findByIdAndDelete(id);
    logger.access.debug("Acceso a controller 'delete' ,esquema 'users'");
    if (resultado) {
      return res.json({ resultado });
    } else {
      logger.error.error(
        "Error en el controller 'delete', esquema 'eventos', fallo en el borrado de un users'"
      );
    }
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'update', esquema 'users''"
    );
    return res.status(500).json({ error: "error de servidor" });
  }
});
