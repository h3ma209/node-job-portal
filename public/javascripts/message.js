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
  socket.emit('chat',{"from":name,'msg':msg});
  $('.pc .middle').append(`
    
    <div class="message-row you">
        <div class="message">${msg}</div>
        <div class="date">Apr 16</div>
    </div>
    
`);
  $(".pc form input").val("");
})

}

function addMsg(msg,div){
  $(div).append(`
    <div class="message-row other">
      <div class="message">${msg} </div>
      <div class="date">Apr 16</div>
    </div>
  `)
}

////// pc section/////////



/////////

///////// mobile section /////////////


  //////