var express = require("express");
var router = express.Router();
var io = require('socket.io')();





router.get('/',(req,res)=>{
  res.render('service_search');
});



io.on('connection', function(socket){
  console.log('connected');
  socket.on('disconnect', function(){
    console.log("sock:"+socket.id);
  });
});






module.exports = router;
