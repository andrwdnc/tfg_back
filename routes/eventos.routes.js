const eventoController = require("../controllers/evento.controller");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'clave_secreta';

function authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'No se ha proporcionado un token válido',
      });
    }
  }
  

router.get("/", eventoController.findAll);
router.get("/:id", eventoController.findId);
router.get("/busqueda/:name", eventoController.findName);
router.post("/",authMiddleware, eventoController.create);
router.patch("/:id",authMiddleware, eventoController.update);
router.delete("/:id",authMiddleware, eventoController.delete);

module.exports = router;
