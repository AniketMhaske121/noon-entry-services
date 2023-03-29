const express = require('express');
const {fetchjson,saveTemplateData,getFormDataByShipName} = require("../../controllers/noonEntryController/noonEntryController");
const router = express.Router();



router.get('/noonentryparameter' , fetchjson); // get  request to fetch noon parameter json 
router.post('/saveNoonTemplateData',saveTemplateData)
router.post('/getFormDataByShipName',getFormDataByShipName)



module.exports = router;