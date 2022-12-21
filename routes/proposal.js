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
    if(!fs.existsSync(process.cwd() + '/videos/' + req.params.id))
    fs.mkdirSync(process.cwd() + '/videos/' + req.params.id)
    console.log(`>>${process.cwd()}/videos/${req.params.id}`)
    cb(null, process.cwd() + '/videos/' + req.params.id)
  },
  filename: function (req, file, cb) {
    console.log(`saving ${file.originalname}`)
    cb(null,file.originalname)
  }
})

const upload = multer({ storage })


router.route('/')
.get(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal.' });
})
.post(function(req, res){
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
    else if (fs.existsSync(`${process.cwd()}/videos/${req.params.id}/face.mp4`) && !fs.existsSync(`${process.cwd()}/videos/${req.params.id}/screen.mp4`)) {
      res.status(200).json({ status: req.method + req.params.id + ' folder is exist with only face video files' });
    }
    else if (fs.existsSync(`${process.cwd()}/videos/${req.params.id}/screen.mp4`) && !fs.existsSync(`${process.cwd()}/videos/${req.params.id}/face.mp4`)) {
      res.status(200).json({ status: req.method + req.params.id + ' folder is exist with only screen video files' });
    }
    else
    {
          res.status(200).json({ status: req.method + 'new file is exist but there is no video files' });
    }
  }

  res.status(404).json({ status: "This file is not uploaded yet." });
})
.post(upload.fields([{name:"face", maxCount: 1},{name:"screen", maxCount: 1}]) ,
      function(req, res){
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
