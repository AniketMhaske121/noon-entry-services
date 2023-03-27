const express = require('express');

const router = express.Router();

const { registerShip, getAllships, getShipById ,deleteShipById,updateShipById} = require("../../controllers/shipController/shipController");



router.post('/registership', registerShip); //POST request to register the ship
router.get('/getAllships', getAllships);      // GET request to fetch All ships 
router.get('/getShipById/:id', getShipById);  //GET request to get ship by id
router.delete('/deleteShip/:id',deleteShipById)
router.post('/updateShipById/:id',updateShipById)



module.exports = router;