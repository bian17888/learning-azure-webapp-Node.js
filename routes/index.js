const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = { title: 'Azure App Server' , message : process.env.MESSAGE || 'this is development'}
  res.render('index', data);
});

module.exports = router;
