var models  = require('../models');
var express = require('express');
var path = require('path');
var router  = express.Router();

router.get('/videos', function(req, res) {
  console.log("reached");
  console.log(models.Usersmeta);
	models.Usersmeta.findAll({
    where:{
      content_type:"youtube"
    }
  })
  .then(function(data){
		res.json(data);
	})
});

module.exports = router;
