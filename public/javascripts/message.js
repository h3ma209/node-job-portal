const name = "hema";
const socket = io('http://'+window.location.hostname+':100');
socket.emit('send-name',name);

/// functions //
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  $(".pc").css("display","none");
  $(".mobile").css("display",'initial');
  socket.on("chat",function(data){
    let from = data["from"];
    let msg = data["msg"];
    addMsg(msg,'.mobile .middle');
  });
  
  $(".mobile .bottom form").submit(function(e){
      e.preventDefault();
      let msg = $(".bottom form input").val();
      socket.emit('chat',{"from":name,'msg':msg});
      $('.middle').append(`
        
        <div class="message-row you">
            <div class="message">${msg}</div>
            <div class="date">Apr 16</div>
        </div>
        
    `);
      $(".mobile .bottom form input").val("");
    })
}
else{
  $(".pc .right .chat .topBar .name").html("Random");

socket.on("chat",function(data){
  let from = data["from"];
  let msg = data["msg"];
  addMsg(msg,'.pc .middle');
});

$(".pc form").submit(function(e){
  e.preventDefault();
  let msg = $(".pc form input").val();
  socket.emit('send-message',{"from":name,'msg':msg});
  $('.pc .middle').append(`
    
    <div class="message-row you">
        <div class="message">${msg}</div>
        <div class="date">Apr 16</div>
    </div>
    
`);
  $(".pc form input").val("");
})

}

function addMsg(msg,div,date='Apr 16'){
  $(div).append(`
    <div class="message-row other">
      <div class="message">${msg} </div>
      <div class="date">${date}</div>
    </div>
  `)
}

socket.on("retreiveMSGS",all_msgs=>{
  $('.pc .middle').empty();
  Object.keys(all_msgs).forEach((key)=>{
    let k = all_msgs[key];
    let from = k.form;
    let to = k.to;
    let date = k.date;
    let msg = k.msg;
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    date = new Date(date);
    let month = months[date.getMonth()]
    let day = date.getDay();
    date = month + " " + day;
    if(k.from == name){
      $('.pc .middle').append(`
    <div class="message-row you">
        <div class="message">${msg}</div>
        <div class="date">${date}</div>
    </div>
    
    `);
    }
    else{
      
      addMsg(msg,".pc .middle",date);
    }
    
  });
});

function changeChannels(url){
  
  window.history.pushState('','',"/message/"+url);
  socket.emit("chaningChannels",url);
}