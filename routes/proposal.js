const { query } = require('express');
var express = require('express');
var router = express.Router();
const formidable = require('formidable');
const {Proposal} = require("../database/models/propSchema")


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
.get(async function(req, res) {
  try{
    const proposal = await Proposal.findOne({id: req.params.id})
    if(proposal.publish !== true)
    return res.status(400).json({err:"this proposal is not published yet!"});
    res.status(200).json({...proposal._doc});
  }
  catch(err){
    res.status(300).json({err})
  }
})
.post(function(req, res){

   const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
      res.end(String(err));
      return;
    }
    const {id,client,discription,faceLink,screenLink,publish} = fields
    console.log({id,client,discription,faceLink,screenLink,publish})
    const proposal = new Proposal({id,client,discription,faceLink,screenLink,publish: publish=='true'?'true':'false'})
    proposal.save()
    .then(()=>{
        res.status(200).json(proposal)
    })
  });   
})
.put(function(req, res) {
  res.status(200).json({ status: req.method + ' on /proposal/' + req.params.id });
})
.delete(function(req, res) {
    res.status(200).json({ status: req.method + ' on /proposal/' + req.params.id });
});


module.exports = router;
