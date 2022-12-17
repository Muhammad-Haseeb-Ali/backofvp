var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ status: 'Hurry! your app is running fine.' });
});

module.exports = router;
