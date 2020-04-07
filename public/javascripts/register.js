$(document).ready(function(){
    // inputs
var username = $("input[name='uname']");
var email = $("input[name='uemail']");
var password = $("input[name='password']");
var confirmPass = $("input[name='cnpasswd']");
var fullName = $("input[name='fullname']");
var phoneNum = $("input[name='telphone']");
var proffession = $("input[name='profession']");
var tags = $("input[name='tags']");
//invalids
var inv_username = $(".invalid-username");
var inv_email = $(".invalid-email");
var inv_password = $(".invalid-password");
var inv_cnPass = $(".invalid-Confirmpass");
var inv_fullname = $(".invalid-fullName");
var inv_phoneNum = $(".invalid-phonenum");
var inv_prof = $(".invalid-profession");
var inv_tags = $(".invalid-tags");


// this where the shit begins might one day hacker fuck me up 
// 3/2/2020

username.on("keyup",function(){
  //$(".invalid").html(input.val());

  if($(this).val().length< 6){
    inv_username.html("The username must be longer than 6");
  }
  else{
    inv_username.html("");
  }
});

email.on("keyup",function(){
  pattern = new RegExp(/[a-z0-9_.]+[@]+(gmail||yahoo||outlook)+[.]+(com||org)/,"g");
  if($(this).val().match(pattern) == null){
    inv_email.html("the email must be gmail or yahoo or outlook");
  }
  else{
    inv_email.html("");
  }
});



password.on("keyup",function(){
    //$(".invalid").html(input.val());
  
    if($(this).val().length< 6){
      inv_password.html("The password must be longer than 6 and </br> contain numbers");

    }
    else{
      inv_password.html("");
    }
  });


confirmPass.on("keyup",function(){
    //$(".invalid").html(input.val());
  
    if($(this).val() == password.val()){
        inv_cnPass.html("");
    }
    else{
      
      inv_cnPass.html("The password is not the same");
    }
  });








});