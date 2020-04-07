var express = require('express');
var router = express.Router();
var app = express();
const MongoClient = require("mongodb").MongoClient;
const session = require('express-session');


router.get("/",(req,res)=>{
  var srch= req.query["srchInput"];
  if (srch==undefined || srch ==""){
    res.render('search',{Reqs:'',Errors:""});
  }

  else{
    console.log('search srch: '+srch);
    var pth = "/search/"+srch
    res.writeHead(302, {
         'Location': pth
         //add other headers here...
       });
       res.end();
  }
  res.end();
});


router.get("/:srchInput",(req,res)=>{
  var ipt= req.params.srchInput;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true},(err,db)=>{
    if(err){
      res.render("search",{Reqs:'',Errors:"Sorry Something Went Wrong"});
    }
    else{
      var dbo = db.db("servicesDB");
      dbo.collection("service_UP").find({name:{$regex: new RegExp(ipt,"i")}}).toArray(function(err, result){
        if(err){
          throw err;
        }
        else if(result.length == 0 ){
          res.render("search",{Reqs:'',Errors:"0 results found for: "+ipt});
        }
        else{
          res.render('search',{Reqs:result,Errors:''})
        }
        db.close();
      })
    }
  });
  

});


module.exports = router;
