var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  //console.log(req.session.loginResults);
  if(typeof req.session.loginResults != 'undefined'){
    var name = req.session.name;
    var stars = req.session.loginResults.all_ratings / req.session.loginResults.num_order
    res.render('user',{Username:req.session.loginResults.name,Tags:req.session.loginResults.tags,
    Stars:stars,Num_sales:req.session.loginResults.num_order,Desc:req.session.loginResults.description});
    console.log("NUM:"+stars);
  }
  else{
    console.log("TYPE:" + typeof req.session.loginResults);
    res.writeHead(302,{"Location":'login'});
    res.end();
  }
});

module.exports = router;
