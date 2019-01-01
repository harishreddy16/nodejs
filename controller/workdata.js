var express=require('express');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/db1');
var Schema=mongoose.Schema;

var worksheetSchema = new Schema({
	name:String,
	description:String
}); 
var Worksheet = mongoose.model("Worksheet", worksheetSchema);
module.exports=Worksheet;