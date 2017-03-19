var express = require('express');
var db = require('../models/index')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('input-expense', { title: 'Input Expense' });
});

// Take user input and create data in database
router.post('/', function(req, res) {
  db.Expense.create({
      description: req.body.desc,
      expense: req.body.exp,
      CategoryId: req.body.category
  }).then(()=> {
    res.redirect('/input-expense')
  }).catch((err)=> {
    res.send('Input query failed')
  })
  // res.send(JSON.stringify(req.body))
})


module.exports = router;
