var express = require("express");
var router = express.Router();
var app = express();
const session = require("express-session");
const mongoClient = require("mongodb").MongoClient;
var io = require("socket.io")(100);
var connected_user = "hema";
const DB = 'messagesDB';
const COL = "msgs";
var url = "mongodb://localhost:27017/";


const client_list = {}
io.on('connection', function(socket){
    
    socket.on('send-name', name=>{
        client_list[socket.id] = name;
        
        io.emit("receive-user-list",Object.values(client_list));
        console.log(client_list);
    })


    socket.on('disconnect', function(){
      console.log("Dis sock:"+socket.id);
      delete client_list[socket.id];
      io.emit("receive-user-list",Object.values(client_list));
      
    });

    socket.on('chat',(data)=>{
      socket.broadcast.emit('chat',data);
    });


    socket.on("send-message", msg => {
      console.log(msg);
      let from = msg["from"];
      let fromSock = socket.id;
      let to = msg["to"];
      let nameIndex = Object.values(client_list).indexOf(to);
      let toSock = Object.keys(client_list)[nameIndex];
      msg = msg['msg'];
      io.to(`${toSock}`).emit("receive-message",[from,to,msg]);
    });

  });


router.get("/",(req,res,next)=>{
  mongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true},(err,db)=>{
    //
    if(err){
      console.log("ERR CONNECTING TO DB");
    }
    else{
      var dbo = db.db(DB);
      dbo.collection(COL).find({to:connected_user}).toArray(function(err, result) {
        if (err){
          throw err;
        } 
        else{
          res.render('message',{data:result});
          db.close();  
        }
        
        
        
      });
      //
      
      
    }
    //
    
    
  });

  
});



module.exports = router;