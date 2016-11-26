var models  = require('../models');
var express = require('express');
var path = require('path');
var router  = express.Router();

router.get('/:email', function(req, res) {
  var user;
  models.User.findOne({ where: {email: req.params.email}})
  .then(function(userInstance) {
    user = userInstance;
      user.getUsersmeta().then(function(instance) {
        res.json(instance);
      });
    })
});

router.post("/save", function(req, res) {
  var user;
  var content;
  models.User.findOne({ where: {email: req.body.email}})
  .then(function(userInstance) {
    user = userInstance;
    models.Usersmeta.findOne({ where: { content: req.body.content}})
    .then(function(contentInstance) {
        content = contentInstance;
        user.addUsersmeta([content]).then(function(instance) {
          res.json(instance);
        });
    });
  })
});

module.exports = router;
