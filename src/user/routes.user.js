const express = require("express");
const userController = require('./controller.user')
const authenticateToken = require("../../middleware/authHelper")

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.userLogin);
// router.post('/login/:id', userController.loginUser)



module.exports = router