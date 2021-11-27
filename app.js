var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var universityApplicationRouter = require('./routes/universityApplications');
const eventsRouter = require('./routes/events');
var universityRouter = require('./routes/university');

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser');

// express-session for managing user sessions
const session = require('express-session');
const { mongoose } = require('./routes/mongoose');



var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Set up path for partials
hbs.registerPartials(__dirname + '/views/partials')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*** Session handling **************************************/
// Create a session cookie
app.use(session({
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 6000000,
      httpOnly: true
  }
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/universityApplications', universityApplicationRouter);
app.use('/universities', universityRouter);


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


// will use process.env.PORT for deployment.
const port = process.env.PORT || 3001
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})  // localhost development port 3001  (http://localhost:3001)
   // We've bound that port to localhost to go to our express server.
   // Must restart web server when you make changes to route handlers.

module.exports = app;
