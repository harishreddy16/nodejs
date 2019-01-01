var express = require('express');
var exports = module.exports = {};
var Company = require('./data');
exports.create= function(req, res, next) {
  res.render('company');
};


exports.add=function(req, res){
   var companyInfo = req.body; //Get the parsed information
   console.log(companyInfo);
   if(!companyInfo.name || !companyInfo.description){
      res.render('ss', {message: "Sorry, you provided worng info", type: "error"});
   }
   else 
   {
      var newCompany = new Company({
         name: companyInfo.name,
         description: companyInfo.description,
         });
		
      	newCompany.save(function(err, Company){
        if(err)
            res.render('ss', {message: "Database error", type: "error"});
        else
            res.render('ss', {
            message: "New person added", type: "success", company: companyInfo});
      });
   }
};


exports.display=function(req,res){
    Company.find(function(err, Company){
    res.render('display',{comp: Company});
   });
};


exports.update=function(req,res){
    var uid = req.params.id.toString();
    Company.findOne({"_id" : uid}, function(err, Company){
    console.log(Company);
    res.render('update',{comp: Company});
      });
};


exports.updated=function(req, res){
  Company.findByIdAndUpdate({_id: req.params.id},{name: req.body.name,description   : req.body.description}, function(err, Company){
    if(err) res.json(err);
    else
    { 
      console.log(Company);
      res.redirect('/template');
    }
});
};

exports.delete=function(req, res) { 
var uid = req.params.id.toString();
Company.remove({"_id":uid}, function(err, Company) { 
res.redirect('/template')
});
};