const express = require('express');

const router = express.Router();

const {register} = require("../../controllers/userController/userRegistration.js");

const {login} = require("../../controllers/userController/userLogin");

router.post('/register' , register); //POST request to register the user

router.post('/login' , login); // POST request to login the user

module.exports = router;