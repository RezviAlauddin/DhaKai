var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer= require('nodemailer');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator=require('express-validator');
var cookieParser = require('cookie-parser');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer=require('multer');
var flash=require('connect-flash');
var mongo=require('mongodb');
var mongoose=require('mongoose');
var db=mongoose.connection;
var routes = require('./routes/index');
var users = require('./routes/users');
var register=require('./routes/register');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//handling file upload
 app.use(multer({dest:'./uploads/'}).single('profileimage'));

// app.post('/login', function(req, res){
//     console.log('test');
//     res.end(); // end the response
// });
// // POST method route
// app.post('/users/register', function (req, res) {
//   res.send('POST request to................ the homepage')
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//handle express session
app.use(session({
secret:'secret',
saveUninitialized:true,
resave:true
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//validator
app.use(expressValidator({
	errorFormatter:function(param,msg,value){
		var namespace=param.split('.')
		    ,root=namespace.shift()
			,formParam=root;
		while(namespace.length){
				formParam +='['+namespace.shift() +']';
			}
			return {
				param : formParam,
				msg   :msg,
				value :value
			};
	}
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(function(req,res,next){
	res.locals.messages =require('express-messages')(req,res);
	next();
});


app.get('*', function(req, res,next){
	res.locals.user =req.user || null;
	next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
