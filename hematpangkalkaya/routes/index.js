var express = require('express');
var db = require('../models/index')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hemat Pangkal Kaya' });
});

// Take user input and update data in Category
router.post('/', function(req, res) {
  db.Category.findAll()
    .then((instances)=> {
      let arr = instances.map((val)=> {
        switch (val.name) {
          case 'Food':
            db.Category.update(
              {limit : req.body.food},
              {where: {id: val.id}}
            )
            break;
          case 'Transport':
            db.Category.update(
              {limit : req.body.transport},
              {where: {id: val.id}}
            )
            break;
          case 'Entertainment':
            db.Category.update(
              {limit : req.body.entertainment},
              {where: {id: val.id}}
            )
            break;
        }
      })
      res.redirect('/input-expense')
    }).catch((err)=> {
      res.send('Input query failed')
    })
})


module.exports = router;
