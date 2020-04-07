function change_pic(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function(e){
      $("#uploaded-pic").attr('src',e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function registery_tabs(tgt_id){

  
  var first = document.getElementsByClassName('first-section')[0];
  var second = document.getElementsByClassName('second-section')[0];
  var third = document.getElementsByClassName("third-section")[0];



  var c_1 = document.getElementsByClassName("circle-")[0];
  var c_2 = document.getElementsByClassName("circle-")[1];
  var c_3 = document.getElementsByClassName("circle-")[2];



  g_sec2 = document.getElementById("go-sec-2");
  g_sec1 = document.getElementById("go-sec-1");
  g_sec3 = document.getElementById("go-sec-3");
  b_sec2 = document.getElementById("back-sec-2");

  if(tgt_id == String(g_sec2.id) || tgt_id == String(b_sec2.id)){
    first.style.display = "none";
    second.style.display = "block";
    third.style.display ="none";
    c_1.className = "far fa-circle circle-";
    c_2.className = "fas fa-circle circle-";
    c_3.className = "far fa-circle circle-";
  }
  if(tgt_id == String(g_sec1.id)){
    first.style.display = "block";
    second.style.display = "none";
    third.style.display ="none";
    c_1.className = "fas fa-circle circle-";
    c_2.className = "far fa-circle circle-";
    c_3.className = "far fa-circle circle-";
  }
  if(tgt_id == String(g_sec3.id)){
    first.style.display = "none";
    second.style.display = "none";
    third.style.display ="block";
    c_1.className = "far fa-circle circle-";
    c_2.className = "far fa-circle circle-";
    c_3.className = "fas fa-circle circle-";
  }
  
  if(tgt_id == "subBtn"){
    var fc = document.getElementsByClassName("form-control");
    for(i=0;i<fc.length;i++){
      if(fc[i].value.length < 3){
        alert("Please Make Sure You Filled All The Inputs");
        break;
      }
    }
  }
}



  

