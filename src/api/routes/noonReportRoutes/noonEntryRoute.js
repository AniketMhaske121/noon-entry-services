const express = require('express');
const {fetchjson} = require("../../controllers/noonEntryController/noonEntryController");
const router = express.Router();



router.get('/noonentryparameter' , fetchjson); // get  request to fetch noon parameter json 



module.exports = router;