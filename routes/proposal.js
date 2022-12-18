var express = require('express');
var router = express.Router();
const multer = require("multer")
const fs = require('fs')
const path = require("path")

const directoryPath = e => path.join(process.cwd(), e),
videosDir = directoryPath("/videos")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(!fs.existsSync(process.cwd() + 'videos/new'))
    fs.mkdirSync(process.cwd() + 'videos/new')
    cb(null, process.cwd() + 'videos/new')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})

const upload = multer({ storage: storage })


router.route('/')
.get(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal.' });
})
.post(upload.array("videos",2) , function(req, res){
    res.status(200).json({ status: req.method + ' on /proposal.' });
})
.put(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal.' });
})
.delete(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal.' });
});

router.route('/:id')
.get(function(req, res) {
  if(!fs.existsSync(`${process.cwd()}/videos/${req.params.id}`))
  res.status(404).json({ status: "This file is not uploaded yet." });

  res.status(200).json({ status: req.method + ' on /proposal/' + req.params.id });
})
.post(function(req, res){
    res.status(200).json({ status: req.method + ' on /proposal/' + req.params.id });
})
.put(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal/' + req.params.id });
})
.delete(function(req, res) {
  if(fs.existsSync(`${videosDir}/${req.params.id}`)){
    fs.readdirSync(`${videosDir}/${req.params.id}`)
    .forEach(file => fs.unlinkSync(`${videosDir}/${req.params.id}/${file}`))
    fs.rmdirSync(`${videosDir}/${req.params.id}`)
    res.status(200).json({ status: req.method + ' on /proposal/' + req.params.id });
  }
  res.status(404).json({ status: "This file is not uploaded yet." });
});

module.exports = router;
