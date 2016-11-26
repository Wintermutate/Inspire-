var models  = require('../models');
var express = require('express');
var path = require('path');
var router  = express.Router();

router.get('/:contentType', function(req, res) {
  console.log("reached");
  console.log(models.Usersmeta);
	models.Usersmeta.findAll({
    where:{
      content_type: req.params.contentType
    }
  })
  .then(function(data){
    console.log(data.length);
		res.json(data);
	})
});

// Inserting new content
router.post('/new', function(req, res) {
  var content = req.body.content;
  var contentType = req.body.contentType;
  models.Usersmeta.findAll({
    where:{
      content: req.body.content,
      content_type: req.body.contentType
    }
  })
  .then(function(data){
    if(data.length > 0) { // Send '400' error
      res.statusMessage = "Duplicate entry";
      res.sendStatus(400);
    }
    else {
      models.Usersmeta.create({
        content: req.body.content,
        content_type: req.body.contentType
      }).then(function(instance) { // Successful insert
        res.sendStatus(200);        
      })
    }
  })
});

module.exports = router;
