var models  = require('../models');
var express = require('express');
var path = require('path');
var router  = express.Router();

router.get('/videos', function(req, res) {
	models.usersmeta.findAll({where:{content_type:"youtube"}}).then(function(data){
		res.json(data);
	})
})
module.exports = router;
