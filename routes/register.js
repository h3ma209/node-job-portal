var express = require('express');
var router = express.Router();
app = express();
const session = require('express-session');
const MongoClient = require("mongodb").MongoClient;

router.get('/', function(req, res, next) {
  res.render('register');

});

router.post('/', (req, res, next)=>{
  console.log(req.body);
  const username = req.body.uname;
  const email = req.body.uemail;
  const password = req.body.cnpasswd;
  const location = req.body.location;
  const phone_num = req.body.telphone;
  const profession = req.body.profession;
  const tags = JSON.parse(req.body.tags);
  const gender = req.body.gender;
  var url = "mongodb://localhost:27017/";
  const db_name = "users";
  const col_name = "unVerUsers";
    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true},(err,db)=>{
      if(err){
        console.log("ERROR WHILE CONNECTING TO : "+db_name)
      }
      var col = db.db(db_name);
      col.collection(col_name).insertOne({

        name: username,
        email: email,
        password: password,
        location: location,
        phone:phone_num,
        profession:profession,
        keys:tags,
        gender:gender
      })
      db.close()

    });
    
    res.end();
});

module.exports = router;