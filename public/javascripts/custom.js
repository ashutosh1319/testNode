var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
//var $ = require('jQuery');

var url = 'mongodb://localhost:27017/test';

/*

  function update(id){
       var item ={
	   First_name:"Ravi",
	   Last_name:"Kumar",
	   Address : "Varanasi"

	 };
	alert(id)
	 var id = id;
 	mongo.connect(url,function(err,db){
 	assert.equal(null,err);
 	console.log('id========>', id);
 	db.collection('users').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
 		assert.equal(null,err);
 		console.log('Item updated');
 		res.redirect('/get-data');
 		
 	});
 });
        }