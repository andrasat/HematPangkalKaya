var express = require('express');
var db = require('../models/index')
var router = express.Router();

/* GET Input Expense page */
router.get('/input', function(req, res, next) {
  res.render('input-expense', { title: 'Input Expense' });
});

// Take user input and create data in database
router.post('/input', function(req, res) {
  db.Expense.create({
      description: req.body.desc,
      expense: req.body.exp,
      CategoryId: req.body.category,
      date: req.body.date
  }).then(()=> {
    res.redirect('/expense/result')
  }).catch((err)=> {
    res.send('Input query failed')
  })
})

// GET Result Page
router.get('/result', function(req, res) {
  db.Expense.findAll({
    order: [['id','ASC']]
  })
    .then((expenses)=> {
      db.Category.findAll()
        .then((limits)=> {

          let food = [],
              transport = [],
              entertainment = [],
              sum = 0

          limits.forEach((limit)=> {
            sum += limit.limit
          })

          expenses.forEach((expense)=> {
            if(expense.CategoryId == 1) {
              food.push(expense)
            } else if(expense.CategoryId == 2){
              transport.push(expense)
            } else if(expense.CategoryId == 3){
              entertainment.push(expense)
            }
          })
          res.render('expenses-result', {limits: limits, foods: food, transports: transport, entertainments: entertainment, title: 'Hemat Pangkal Kaya', sum: sum})
        })
    })
    .catch((err)=> {
      res.send('Request data failed')
    })
})

// GET Edit Page combined with result page
router.get('/edit/:id', (req, res)=> {
  db.Expense.findAll({
    order: [['id','ASC']]
  })
    .then((expensesData)=> {
      db.Expense.findById(req.params.id)
        .then((editExpense)=> {
        let food = [],
            transport = [],
            entertainment = []

        expensesData.forEach((expense)=> {
          if(expense.CategoryId == 1) {
            food.push(expense)
          } else if(expense.CategoryId == 2){
            transport.push(expense)
          } else if(expense.CategoryId == 3){
            entertainment.push(expense)
          }
        })

        res.render('expense-edit', {edit: editExpense ,foods: food, transports: transport, entertainments: entertainment, title: 'Hemat Pangkal Kaya'})
      })
      .catch((err)=> {
        res.send('Request data failed')
      })
    })
})

// POST edit page
router.post('/edit/:id', (req, res)=> {
  db.Expense.update({
    date: req.body.edit_date,
    description: req.body.edit_desc,
    expense: req.body.edit_expense
  }, {
    where: {id: req.params.id}
  })
    .then(()=> {
      res.redirect('/expense/result')
    })
    .catch((err)=> {
      res.send('Update data failed')
    })
})

// GET delete data
router.get('/delete/:id', (req, res)=> {
  db.Expense.destroy({
    where: {id: req.params.id}
  })
    .then(()=> {
      res.redirect('/expense/result')
    })
    .catch((err)=> {
      res.send('Delete data Failed')
    })
})


module.exports = router;
