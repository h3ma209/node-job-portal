
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);
var sanitizer = require('sanitizer');

function check_empty(array){
    if(Array.isArray(array)){
        for(var i in array){
            var obj = array[i];
            if(Array.isArray(obj)){

            }
            else{

            }
        }
    }
}

function ExecuteOrder66(input){
    this.input = input;
    this.isSecure = true;
    this.isArray = Array.isArray(input);   
}

ExecuteOrder66.prototype.XSS = function(){
    this.input = DOMPurify.sanitize(this.input);
    this.input = this.input.match(new RegExp(/\w+/,'g'));
    return String(this.input).replace(new RegExp(/,/,"g"), " ");
}

ExecuteOrder66.prototype.PN = function(){    
    pattern = new RegExp(/[0][7][1-8][0-8].\d{3}.\d{4}/,"g");
    this.input = this.input.match(pattern);
    return String(this.input).replace(new RegExp(/,/,"g"), " ");
}

ExecuteOrder66.prototype.EMAIL = function(){
    pattern = new RegExp(/[a-z0-9_.]+[@]+(gmail||yahoo||outlook)+[.]+(com||org)/,"g");
    this.input = this.input.match(pattern);
    return String(this.input).replace(new RegExp(/,/,"g"), " ");
    
}
console.log(new ExecuteOrder66("hema@gmail.com").EMAIL());
console.log(new ExecuteOrder66("0770-157-6649").PN());
var x = `javascript:/*--></title></style>23</textarea></script></xmp><svg/onload='+/"/+/onmouseover=1/+/[*/[]/+alert(1)//'>`
console.log(new ExecuteOrder66(x).XSS());
console.log(new ExecuteOrder66("<x/><title>&lt;/title&gt;&lt;img 23 src=1 onerror=alert(1)&gt;").XSS().match(new RegExp(/\w+/,"g")));
console.log(new ExecuteOrder66(x).XSS());
var fek = `<img src=x onerror="&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041">`;
console.log(new ExecuteOrder66(fek).XSS().match(new RegExp(/\w+/,"g")));
console.log("SAN: "+sanitizer.escape("' union select "));