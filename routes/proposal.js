var express = require('express');
var router = express.Router();

/* GET users listing. */
router.route('/')
.get(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal.' });
})
.post(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal.' });
})
.put(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal.' });
})
.delete(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal.' });
});

module.exports = router;
