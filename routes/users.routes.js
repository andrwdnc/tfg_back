const usersController = require("../controllers/users.controller");
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


router.get("/", usersController.findAll);
router.get("/:name", usersController.find);
router.post("/login", usersController.login);
router.post("/changePass",authMiddleware, usersController.changePass);
router.post("/", usersController.create);
router.patch("/",authMiddleware, usersController.update);
router.delete("/:id",authMiddleware, usersController.delete);


module.exports = router;
