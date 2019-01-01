var express=require('express');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/db1');
var Schema=mongoose.Schema;

var companySchema = new Schema({
	name:String,
	description:String
}); 

var Company = mongoose.model("Company", companySchema);
module.exports=Company;



