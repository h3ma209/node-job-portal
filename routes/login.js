var express = require('express');
var router = express.Router();
app = express();
const session = require('express-session');
const MongoClient = require("mongodb").MongoClient;
//const {check,validationResult} = require("express-validator");

router.get('/', function(req, res, next) {
  //req.session.name = "ehehehe";
  console.log("----------------------------------------------");
  console.log(req.session);
  res.render('login',{Errors:""});
});

router.post("/",function(req,res,next){
  //req.session.email = req.body.email;
  //req.session.pass = req.body.passwd;
  const email = req.body.email;
  const passwd = req.body.passwd;

  const DB = 'usersDB';

  if(email.length == 0 | email == 'undefined' | email == "" | email == null | passwd == null | passwd.length == 0 | passwd == 'undefined' | passwd == ""){
    res.render("login",{Errors:"Dont Leave Anything Empty"});
  }
  else{
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true},(err,db)=>{
      //if(err) throw err;
      if(err){
        res.render("login",{Errors:"Sorry Something Went Wrong"});
      }
      else{
        var dbo = db.db(DB);
        dbo.collection("users").findOne({"email":req.body.email,"passwd":req.body.passwd},(err,result)=>{

          if(err){
            console.log("ERROR in col");
            throw err;
          }
          else if(result == null){
            res.render("login",{Errors:"invalid username/password"});
          }
          else{
            console.log(result);
            req.session.loginResults = result;
            //res.render("user",{Username:result.name,Tags:result.tags});
            res.writeHead(302,{"Location":"user"});
            res.end();
          }
          db.close();
        })
      }
    });
  }
  //res.end();
});


module.exports = router;
