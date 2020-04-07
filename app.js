var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var upload = multer();
var bodyParser = require('body-parser');
const helmet = require('helmet')
const session = require('express-session');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);




var indexRouter = require('./routes/index');
var userRouter = require("./routes/user");
var searchRouter = require("./routes/search");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var message = require("./routes/message");





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit:"250kb"}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images/pics')));
app.use(express.static(path.join(__dirname, 'public/images/web-design')));
app.use(express.static(path.join(__dirname, 'public/images/categories')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(helmet());
const options = {
  name: 'foo', // Default is connect.sid
  store: this.store, // Default is memoryStore, which is for dev only. Setup redis or memcached for prod
  secret: 'dugifugishugiwashere2014', // Required, used to sign session id cookie
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  resave: true, //Forces the session to be saved back to the session store
  rolling: true, //Force a session identifier cookie to be set on every response
  cookie: { maxAge: 600000 } // for one hour
};
// Session method will return a middleware function.
const middleware = session(options);
// Now we can make use of session in all the requests
app.use(middleware)


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/search', searchRouter);
app.use('/user', userRouter);
app.use("/message",message);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// io section




server.listen(80);
module.exports = app;
