var express = require('express');
var exports = module.exports = {};
var Worksheet = require('./workdata');

exports.create= function(req, res, next) {
  res.render('work');
};

exports.display=function(req,res){
    Worksheet.find(function(err, Worksheet){
    res.render('workdisp',{work: Worksheet});
   });
};

exports.add=function(req, res){
   var worksheetInfo = req.body; 
   console.log(worksheetInfo);
   if(!worksheetInfo.name || !worksheetInfo.description){
      res.render('sss', {message: "Sorry, you provided worng info", type: "error"});
   }
   else 
   {
      var newWorksheet = new Worksheet({
         name: worksheetInfo.name,
         description: worksheetInfo.description,
         });
		
      	newWorksheet.save(function(err, Worksheet){
        if(err)
            res.render('sss', {message: "Database error", type: "error"});
        else
            res.render('sss', {message: "New person added", type: "success", worksheet: worksheetInfo});
      });
   }
};


exports.update=function(req,res){
    var uid = req.params.id.toString();
    Worksheet.findOne({"_id" : uid}, function(err, Worksheet){
    console.log(Worksheet);
    res.render('update1',{work: Worksheet});
      });
};


exports.updated=function(req, res){Worksheet.findByIdAndUpdate({_id: req.params.id},
  {
    name: req.body.name,
    description   : req.body.description
  }, function(err, Worksheet){
  if(err) res.json(err);
  else
  { 
    console.log(Worksheet);
    res.redirect('/worksheet/');
    }
  });
};


exports.delete=function(req, res) { 
var uid = req.params.id.toString();
Worksheet.remove({"_id":uid}, function(err, Worksheet) { 
res.redirect('/worksheet/')
});
};