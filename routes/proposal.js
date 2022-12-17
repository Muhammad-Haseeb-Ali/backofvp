var express = require('express');
var router = express.Router();
const formidable = require("formidable")

/* GET users listing. */
router.route('/')
.get(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal.' });
})
.post(function(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req,(err, fields, files) => {
    res.status(200).json({ status: req.method + ' on /proposal.' });
  });
})
.put(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal.' });
})
.delete(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal.' });
});

module.exports = router;
