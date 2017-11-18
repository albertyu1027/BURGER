
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');


router.get('/', function(req, res) {
  res.redirect('/index');
});

router.get('/index', function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {burgers: data};
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/burgers/insertOne', function(req, res) {
  burger.insertOne(['burger_name', 'devoured'], [req.body.name, false], function() {
    res.redirect('/index');
  });
});

router.put('/burgers/updateOne/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);

  burger.updateOne({devoured: req.body.devoured}, condition, function() {
    res.redirect('/index');
  });
});

router.delete("/burgers/delete/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// export the router (controller) back to the server
module.exports = router;