const Evento = require("../models/eventos.model");
const logger = require("../logger");

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

exports.findAll = wrapAsync(async (req, res, next) => {
  try {
    const eventos = await Evento.find();
    logger.access.debug("Acceso a controller 'findAll' ,esquema 'eventos'");
    return res.json({ eventos });
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'findAll', esquema 'eventos'"
    );
    return res.status(500).json({ error: "error de servidor" });
  }
});

exports.findId = wrapAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findById(id);
    logger.access.debug("Acceso a controller 'findID' ,esquema 'eventos'");
    if (evento) {
      return res.json({ evento });
    } else if (!evento) {
      logger.access.debug(
        "No se ha encontrado ningun evento con ese ID en la base de datos : " +
          id +
          " controller findID de 'eventos'"
      );
    } else {
      logger.error.error("Error en el controller 'findId', esquema 'eventos'");
    }
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'findID', esquema 'eventos'"
    );
    return res.status(500).json({ error: "error de servidor" });
  }
});

exports.create = wrapAsync(async (req, res, next) => {
  try {
    const newEvento = new Evento(req.body);
    const resultado = await newEvento.save();
    logger.access.debug("Acceso a controller 'create' ,esquema 'eventos'");
    if (resultado) {
      return res.json({ resultado });
    } else {
      logger.error.error(
        "Error en el controller 'create', esquema 'eventos', fallo en la creacion de evento'"
      );
    }
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'create', esquema 'eventos'"
    );

    return res.status(500).json({ error: "error de servidor" });
  }
});

exports.update = wrapAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const EventoUp = await Evento.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    logger.access.debug("Acceso a controller 'update' ,esquema 'eventos'");
    if (EventoUp) {
      return res.json({ EventoUp });
    } else {
      logger.error.error(
        "Error en el controller 'update', esquema 'eventos', fallo en la actualizacion del eventos'"
      );
    }
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'update', esquema 'eventos'"
    );
    return res.status(500).json({ error: "error de servidor" });
  }
});

exports.delete = wrapAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await Evento.findByIdAndDelete(id);
    logger.access.debug("Acceso a controller 'delete' ,esquema 'eventos'");
    if (resultado) {
      return res.json({ resultado });
    } else {
      logger.error.error(
        "Error en el controller 'delete', esquema 'eventos', fallo en el borrado de un evento'"
      );
    }
  } catch (error) {
    logger.error.fatal(
      "Error al acceder al controller 'update', esquema 'eventos''"
    );
    return res.status(500).json({ error: "error de servidor" });
  }
});
