var express = require('express');
var router = express.Router();
const multer = require("multer")
const fs = require('fs')
const path = require("path")

const directoryPath = e => path.join(process.cwd(), e),
videosDir = directoryPath("/videos")

if(!fs.existsSync(videosDir))
fs.mkdirSync(videosDir)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(!fs.existsSync(process.cwd() + '/videos/new'))
    fs.mkdirSync(process.cwd() + '/videos/new')
    cb(null, process.cwd() + '/videos/new')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})

const upload = multer({ storage })


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
  if(fs.existsSync(`${process.cwd()}/videos/${req.params.id}`)){
    if(fs.existsSync(`${process.cwd()}/videos/${req.params.id}/face.mp4`) && fs.existsSync(`${process.cwd()}/videos/${req.params.id}/screen.mp4`))
    res.status(200).json({ status: req.method + ' on /proposal/' + req.params.id });
    else if (fs.existsSync(`${process.cwd()}/videos/${req.params.id}/face.mp4`)) {
      res.status(200).json({ status: req.method + 'new file is exist with only screen video files' });
    }
    else if (fs.existsSync(`${process.cwd()}/videos/${req.params.id}/screen.mp4`)) {
      res.status(200).json({ status: req.method + 'new file is exist with only screen video files' });
    }
    else
    {
          res.status(200).json({ status: req.method + 'new file is exist but there is no video files' });
    }
  }

  res.status(404).json({ status: "This file is not uploaded yet." });
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
