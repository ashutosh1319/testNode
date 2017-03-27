var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
//var $ = require('jQuery');

var url = 'mongodb://localhost:27017/test';


/* GET home page. */
router.get('/', function(req, res, next) {
  	var resultArray = [];
	mongo.connect(url,function(err,db){
 	var cursor = db.collection('users').find();
 		assert.equal(null,err);
 		cursor.forEach(function(doc,err){
 			assert.equal(null,err);
 			resultArray.push(doc);
 		},function(){
 			res.render('index',{items:resultArray,success_update_fetch:false});
 		});
 		
 });
  //res.render('index', { title: 'Guys To My First Mean Project!' });
  //show_records(res,req,next);  
});

function show_records(res,req,next){
	var resultArray = [];
	mongo.connect(url,function(err,db){
 	var cursor = db.collection('users').find();
 		assert.equal(null,err);
 		cursor.forEach(function(doc,err){
 			assert.equal(null,err);
 			resultArray.push(doc);
 		},function(){
 			res.render('index',{items:resultArray});
 		});
 		
 });
}

router.get('/get-data',function(req,res,next){
	show_records(res,req,next);
	
});

router.post('/insert',function(req,res,next){
	 var item ={
	   First_name:req.body.first_name,
	   Last_name:req.body.last_name,
	   Address : req.body.city

	 };
	 if(item.First_name !="" && item.Last_name !="" && item.Address != "") { 
	mongo.connect(url,function(err,db){
 	assert.equal(null,err);
 	db.collection('users').insert(item,function(err,db){
 		assert.equal(null,err);
 		console.log('Item inserted');
 		res.redirect('/get-data');
 		
 	});
 });
} else {
	res.redirect('/');
	//res.render('index',{error_mesg:"Fill all the fields!"});
}



});

router.get('/update/:id',function(req,res,next){

     /**************Default All Records*******************/
var resultArray = [];
	mongo.connect(url,function(err,db){
 	var cursor = db.collection('users').find();
 		assert.equal(null,err);
 		cursor.forEach(function(doc,err){
 			assert.equal(null,err);
 			resultArray.push(doc);
 		});
 		
 });
     /***************End Default All Records********************/ 
  
	  	var form_data = [];
	  	var id = req.params.id;
		mongo.connect(url,function(err,db){
	 	var cursor = db.collection('users').find({"_id": objectId(id)});
	 		assert.equal(null,err);
	 		cursor.forEach(function(doc,err){
	 			assert.equal(null,err);
	 			form_data.push(doc);
	 		},function(){
	 			console.log(form_data);
	 			
	 			res.render('index',{items:resultArray,frm:form_data[0],success_update_fetch:true});
	 		});
	 		
	 });	
    
});

router.post('/update_records',function(req,res,next){


 
      var item ={
	   First_name:req.body.First_name1,
	   Last_name:req.body.Last_name1,
	   Address : req.body.Address1

	 };

	 var id = req.body.idd;
 	mongo.connect(url,function(err,db){
	 	assert.equal(null,err);
	 	db.collection('users').update({"_id": objectId(id)}, {$set: item}, function(err, result) {
	 		assert.equal(null,err);
	 		console.log('Item updated');
	 		res.redirect('/');
	 		
 	});
 });  
    
});



router.post('/delete',function(req,res,next){
     removeUser(req,res,next);    
});

function removeUser(req,res,next){

	var id = req.body.id;
    mongo.connect(url,function(err,db){
 	assert.equal(null,err);
 	db.collection('users').deleteOne({"_id": objectId(id)}, function(err, result) {
 		assert.equal(null,err);
 		console.log('Item deleted');
 		res.redirect('/get-data');
 		
 	});
 });
}

module.exports = router;
